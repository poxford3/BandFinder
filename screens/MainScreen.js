import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { api_key } from "../assets/api_key";

export default function MainScreen({ navigation, route }) {
  const info = route.params;

  const artist = JSON.stringify(info.artist).replace(/\"/g, "");

  // console.log(info);

  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(true);
  // const [artist, setArtist] = useState("Dance Gavin Dance");

  var keyCount = -1;

  const rootURL = "http://ws.audioscrobbler.com/";
  const artistURL = artist.replace(/ /g, "+");
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
    artistURL +
    "&api_key=" +
    api_key +
    "&format=json";

  // help from lucktale#2736 in RN discord :)
  const getAlbumInfo = async () => {
    let albumData = [];
    const response = await fetch(url);
    const json = await response.json();

    console.log(json.error);

    if (json.error === undefined) {
      json.topalbums.album.forEach((doc) => {
        // console.log(doc);
        let album = {
          albumName: doc.name,
          key: (keyCount += 1),
          playCount: doc.playcount,
        };
        doc.image.forEach((doc2) => {
          if (doc2.size === "large") {
            // console.log(doc2["#text"]);
            album = { ...album, imageURL: doc2["#text"] };
            // break;
          }
        });
        albumData.push(album);
      });
    } else {
      setLoaded(false);
    }

    // console.log(albumData);
    setAlbums(albumData);
  };

  useEffect(() => {
    getAlbumInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={{ width: 40 }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 26 }}>{"<"}</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        <Text style={{ fontSize: 25, fontWeight: "600", paddingVertical: 10 }}>
          {artist}
        </Text>
        <View style={{ width: 40 }}></View>
      </View>
      <View style={styles.listView}>
        {loaded ? (
          <FlatList
            data={albums}
            numColumns={2}
            initialNumToRender={20}
            renderItem={({ item }) => (
              <View style={styles.albumItem}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Album", {
                      albumName: item.albumName,
                      imageURL: item.imageURL,
                      artistURL: artistURL,
                    });
                  }}
                >
                  <Image
                    source={{
                      uri: item.imageURL
                        ? item.imageURL
                        : item.imageURL != ""
                        ? item.imageURL
                        : "https://picsum.photos/200",
                    }}
                    style={styles.albumImg}
                  />
                  <Text style={{ paddingTop: 10, textAlign: "center" }}>
                    {item.albumName}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.errorView}>
            <Ionicons name="thunderstorm-outline" size={80} />
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              Unable to load, press the back arrow and try re-entering the
              artist's name.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  albumImg: {
    height: 150,
    width: 150,
  },
  albumItem: {
    height: 200,
    width: "43%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#aad3e6",
  },
  errorView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  listView: {
    height: "100%",
    width: "100%",
    alignItems: "space-between",
  },

  topView: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    flexDirection: "row",
    // height: 40,
  },
});

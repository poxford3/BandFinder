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
import { Searchbar } from "react-native-paper";
import { api_key, shared_secret_key } from "../assets/api_key";

export default function MainScreen({ navigation, route }) {
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState("Dance Gavin Dance");
  const testList = [
    {
      name: "name1",
      id: 1,
    },
    {
      name: "name2",
      id: 2,
    },
    {
      name: "name3",
      id: 3,
    },
    {
      name: "name4",
      id: 4,
    },
    {
      name: "name5",
      id: 5,
    },
  ];
  var keyCount = -1;

  // const api_key = api_key;
  const rootURL = "http://ws.audioscrobbler.com/";
  // const artist = "Dance Gavin Dance";
  const artistURL = artist.replace(/ /g, "+");
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" +
    artistURL +
    "&api_key=" +
    api_key +
    "&format=json";

  console.log(url);

  // help from lucktale#2736 in RN discord :)
  const getAlbumInfo = async () => {
    let albumData = [];
    const response = await fetch(url);
    const json = await response.json();

    json.topalbums.album.forEach((doc) => {
      // console.log(doc.mbid);
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
    // console.log(albumData);
    setAlbums(albumData);
  };

  useEffect(() => {
    getAlbumInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Text style={{ fontSize: 25 }}>{artist}</Text>
        {/* <View style={styles.searchCont}>
          <Searchbar
            style={styles.searchbar}
            value={artist}
            // onChangeText={(text) => setArtist(text)}
          />
        </View> */}
      </View>
      <View style={styles.listView}>
        {/* <Text>test</Text> */}
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
                  // navigation.setOptions({ title: artist });
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
  container: {
    flex: 1,
    backgroundColor: "#aad3e6",
  },
  listView: {
    height: "100%",
    width: "100%",
    // justifyContent: "space-between",
    alignItems: "space-between",
  },
  searchbar: {
    marginVertical: 5,
  },
  searchCont: {
    width: "90%",
    marginVertical: 5,
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    // height: 40,
  },
});

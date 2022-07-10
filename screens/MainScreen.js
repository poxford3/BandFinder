import React, { useState } from "react";
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
import { api_key, shared_secret_key } from "../assets/api_key";

export default function MainScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
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

  // const api_key = api_key;
  const rootURL = "http://ws.audioscrobbler.com/";
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=dancegavindance&api_key=" +
    api_key +
    "&format=json";

  // console.log(url);

  const getAlbumInfo = async () => {
    let albumData = [];
    const response = await fetch(url);
    const json = await response.json();

    json.topalbums.album.forEach((doc) => {
      // console.log(doc.mbid);
      let album = { albumName: doc.name, key: doc.mbid };
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar style="auto" />
      </View>
      <View style={styles.listView}>
        {/* <Text>test</Text> */}
        <FlatList
          data={testList}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                source={require("../assets/arse.jpeg")}
                style={styles.albumCover}
              />
              <TouchableOpacity
                onPress={() => {
                  getAlbumInfo();
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <Text>Album Name</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  albumCover: {
    height: "90%",
    width: "90%",
  },
  container: {
    flex: 1,
  },
  listItem: {
    height: 180,
    width: "45%",
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#515151",
  },
  listView: {
    height: "95%",
    width: "100%",
    // justifyContent: "space-between",
    alignItems: "space-between",
  },
  topView: {
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { Searchbar } from "react-native-paper";
import { api_key } from "../assets/api_key";

export default function SearchScreen({ navigation }) {
  const [artist, setArtist] = useState("");
  const [songs, setSongs] = useState([]);

  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${api_key}&format=json`;

  // console.log(url);

  var keyCount = -1;

  const getTopTracks = async () => {
    let songData = [];
    const response = await fetch(url);
    const json = await response.json();

    // console.log(json.track);

    json.tracks.track.forEach((doc) => {
      let song = {
        songName: doc.name,
        key: (keyCount += 1),
      };
      doc.image.forEach((doc2) => {
        if (doc2.size === "large") {
          song = { ...song, imageURL: doc2["#text"] };
        }
      });
      songData.push(song);
    });
    setSongs(songData);
  };

  useEffect(() => {
    // getTopTracks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <AutoScroll style={styles.imageScroll} endPaddingWidth={35} delay={500}>
          <Image
            // source={require("../assets/arse.jpeg")}
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.images}
          />
        </AutoScroll>
        {/* <AutoScroll style={styles.imageScroll} endPaddingWidth={35} delay={500}>
          <FlatList
            data={songs}
            initialNumToRender={15}
            horizontal
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item.imageURL }} style={styles.images} />
            )}
          />
        </AutoScroll> */}
        <Text style={{ fontWeight: "bold" }}>
          View the discography of your favorite artist!
        </Text>
        <View style={styles.searchBarCont}>
          <Searchbar
            placeholder="Enter an artist's name..."
            value={artist}
            onChangeText={setArtist}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate("Album List", {
              artist: artist,
            });
          }}
        >
          <Text style={{ fontSize: 24 }}>Search</Text>
        </TouchableOpacity>
        {/* <View style={styles.pokemon}>
          <TouchableOpacity
            style={styles.pokeButton}
            onPress={navigation.navigate("Pokemon")}
          >
            <Text>To the other list</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  images: {
    height: 200,
    width: 240,
    // margin: 10,
  },
  imageScroll: {
    height: 250,
    borderRadius: 1,
    borderColor: "black",
    marginTop: 20,
  },
  pokeButton: {
    height: 40,
    width: 200,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  pokemon: {
    marginTop: 50,
  },
  searchBarCont: {
    width: "90%",
    marginVertical: 20,
  },
  submitButton: {
    width: "75%",
    height: 40,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
});

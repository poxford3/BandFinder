import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { Searchbar } from "react-native-paper";

export default function SearchScreen({ navigation }) {
  const [artist, setArtist] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <AutoScroll style={styles.imageScroll}>
          <Image
            source={require("../assets/arse.jpeg")}
            // source={{ uri: "https://picsum.photos/200" }}
            style={styles.images}
          />
        </AutoScroll>
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

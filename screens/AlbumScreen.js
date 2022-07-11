import React from "react";
import { View, Text } from "react-native";
import { api_key, shared_secret_key } from "../assets/api_key";

export default function AlbumScreen({ navigation, route }) {
  const albumInfo = route.params;
  const albumName = JSON.stringify(albumInfo.albumName).replace(/\"/g, "");
  const albumNameURL = albumName.replace(/ /g, "+");

  const url =
    "http://ws.audioscrobbler.com//2.0/?method=album.getinfo&api_key=" +
    api_key +
    "&artist=Dance+Gavin+Dance&album=" +
    albumNameURL +
    "&format=json";

  // console.log(url);

  return (
    <View>
      <Text>AlbumScreen</Text>
      <Text>{albumName}</Text>
    </View>
  );
}

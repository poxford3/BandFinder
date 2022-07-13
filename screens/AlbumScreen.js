import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { api_key, shared_secret_key } from "../assets/api_key";

export default function AlbumScreen({ navigation, route }) {
  const albumInfo = route.params;
  const albumName = JSON.stringify(albumInfo.albumName).replace(/\"/g, "");
  const albumImage = JSON.stringify(albumInfo.imageURL).replace(/\"/g, "");
  const albumNameURL = albumName.replace(/ /g, "+");

  const [songsData, setSongsData] = useState([]);
  const [albumSummary, setAlbumSummary] = useState("");

  const url =
    "http://ws.audioscrobbler.com//2.0/?method=album.getinfo&api_key=" +
    api_key +
    "&artist=Dance+Gavin+Dance&album=" +
    albumNameURL +
    "&format=json";

  // console.log(url);

  const getSongInfo = async () => {
    let songData = [];
    const response = await fetch(url);
    const json = await response.json();

    setAlbumSummary(json.album.wiki.summary);

    // console.log(json.album.wiki.published);

    json?.album?.tracks?.track?.forEach((doc) => {
      let song = {
        songName: doc.name,
        duration: doc.duration,
        minutes: Math.floor(doc.duration / 60),
        seconds: (
          doc.duration -
          Math.floor(doc.duration / 60) * 60
        ).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }),
        rank: doc["@attr"].rank,
        summary: doc.summary,
      };
      songData.push(song);
    });

    setSongsData(songData);
    // console.log(songsData);
  };

  useEffect(() => {
    getSongInfo();
    // console.log(songsData);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.albumHeader}>
        <Image
          source={{
            uri: albumImage
              ? albumImage
              : albumImage != ""
              ? albumImage
              : "https://picsum.photos/200",
          }}
          style={styles.albumImg}
        />
        <Text style={styles.headerText}>{albumName}</Text>
      </View>
      <View style={styles.songList}>
        <FlatList
          data={songsData}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
              <View style={styles.leftSide}>
                <Text numberOfLines={1}>
                  {item.rank}. {item.songName}
                </Text>
              </View>
              <View style={styles.rightSide}>
                <Text>
                  {item.minutes}:{item.seconds}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  albumHeader: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  albumImg: {
    height: 200,
    width: 200,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
  },
  leftSide: {
    flexDirection: "row",
    width: "90%",
  },
  rightSide: {},
  songItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#b3b3b3",
  },
  songList: {
    // alignItems: "center",
    flex: 7,
  },
});

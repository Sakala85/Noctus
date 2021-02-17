import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

const PlaySound = ({ uri }) => {
  const [sound, setSound] = React.useState();
  var onPlaybackStatusUpdate;
  console.log(onPlaybackStatusUpdate);
  async function playSound() {
    console.log("Loading Sound");
    console.log(uri);
    const tmp = new Audio.Sound();
    tmp.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    const { sound } = await tmp.loadAsync({ source: uri });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

export default PlaySound;

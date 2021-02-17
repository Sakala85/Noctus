import React from "react";
import { StyleSheet } from "react-native";
import { Fab, Icon } from "native-base";

const FloatingClockButton = ({ actionOnPress }) => (
  <Fab style={styles.button} position="bottomLeft" onPress={actionOnPress}>
    <Icon name="close-outline" />
  </Fab>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2f808b",
  },
});

export default FloatingClockButton;

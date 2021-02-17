import React from "react";
import { StyleSheet } from "react-native";
import { Fab, Icon } from "native-base";

const FloatingSaveButton = ({ actionOnPress }) => (
  <Fab style={styles.button} position="bottomRight" onPress={actionOnPress}>
    <Icon name="save-outline" />
  </Fab>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2f808b",
  },
});

export default FloatingSaveButton;

import React from "react";
import { StyleSheet } from "react-native";
import { Fab, Icon } from "native-base";

const FloatingButton = ({ actionOnPress }) => (
  <Fab
    direction="up"
    style={styles.button}
    position="bottomRight"
    onPress={actionOnPress}
  >
    <Icon name="add" style={{ color: "#F6CFCA" }} />
  </Fab>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2f808b",
  },
});

export default FloatingButton;

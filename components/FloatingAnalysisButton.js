import React from "react";
import { StyleSheet } from "react-native";
import { Fab, Icon } from "native-base";

const FloatingAnalysisButton = ({ actionOnPress }) => (
  <Fab
    direction="up"
    style={styles.button}
    position="bottomLeft"
    onPress={actionOnPress}
  >
    <Icon name="analytics-outline" style={{ color: "#F6CFCA" }} />
  </Fab>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2f808b",
  },
});

export default FloatingAnalysisButton;

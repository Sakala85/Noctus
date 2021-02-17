import React from "react";
import { Header as NBHeader, Body, Title, Icon } from "native-base";
import { TouchableOpacity, StyleSheet, StatusBar } from "react-native";

const Header = ({ isFavorit, setFavorits }) => {
  return (
    <NBHeader
      style={styles.container}
      rightComponent={{ icon: "home", color: "#fff" }}
    >
      <Body>
        <Title>Noctus</Title>
        {isFavorit !== undefined && (
          <TouchableOpacity
            style={styles.fav}
            onPressOut={() => setFavorits(isFavorit ? "Dreams" : "Favorits")}
          >
            <Icon
              name={isFavorit ? "heart" : "heart-outline"}
              style={{ color: "#F6CFCA", paddingRight: 10 }}
            />
          </TouchableOpacity>
        )}
      </Body>
    </NBHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#2f808b",
  },
  fav: {
    position: "absolute",
    right: 0,
  },
});

export default Header;

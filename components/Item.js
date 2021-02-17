import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Icon } from "native-base";

const { width } = Dimensions.get("window");

const Item = ({
  inCompleteDream,
  completeDream,
  textValue,
  toggleItem,
  id,
  deleteDream,
  isFavorit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => toggleItem(id, isFavorit)}>
          <Icon
            name={isFavorit ? "heart" : "heart-outline"}
            style={{ paddingLeft: 10, color: "#F6CFCA" }}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,
            {
              color: isFavorit ? "#F6CFCA" : "#F6CFCA",
            },
          ]}
        >
          {textValue}
        </Text>
      </View>
      <TouchableOpacity onPressOut={() => deleteDream(id)}>
        <Icon name="md-trash" style={{ color: "#F6CFCA", paddingRight: 10 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#F6CFCA",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#F6CFCA",
    fontSize: 18,
    marginVertical: 20,
    paddingLeft: 10,
  },

  rowContainer: {
    flexDirection: "row",
    width: width / 2,
    alignItems: "center",
  },
});

export default Item;

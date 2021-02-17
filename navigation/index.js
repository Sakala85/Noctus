import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import AddDreamScreen from "../screens/AddDreamScreen";

const StackNav = createStackNavigator(
  {
    Noctus: {
      screen: HomeScreen,
    },
    AddTask: {
      screen: AddDreamScreen,
    },
  },
  {
    headerMode: "none",
    mode: "modal",
  }
);

const RootNavigator = createAppContainer(StackNav);

export default RootNavigator;

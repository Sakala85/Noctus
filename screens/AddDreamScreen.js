import React, { Component } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import {
  Form,
  Item,
  Input,
  Button,
  Text as NBText,
  Card,
  Title,
  Text,
  Divider,
} from "native-base";
import Header from "../components/Header";
import FloatingSaveButton from "../components/FloatingSaveButton";
import FloatingCloseButton from "../components/FloatingCloseButton";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import PlaySound from "../components/PlaySound";

class AddDreamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: null,
      uri: null,
      haveRecordingPermissions: false,
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: "00:00:00",
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "00:00:00",
      duration: "00:00:00",
    };
  }
  state = {
    text: "",
    title: "",
    checked: false,
  };
  componentDidMount() {}
  startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      this.state.recording = recording;
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  stopRecording = async () => {
    console.log("Stopping recording..");
    await this.state.recording.stopAndUnloadAsync();
    const uri = this.state.recording.getURI();
    this.state.uri = uri;
    this.state.recording = undefined;
    console.log("Recording stopped and stored at", uri);
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.nativeEvent.text });
  };

  onChangeText = (event) => {
    this.setState({ text: event.nativeEvent.text });
    Keyboard.dismiss();
  };
  onAddDream = () => {
    this.props.navigation.state.params.saveItem(this.state);
    this.props.navigation.goBack();
  };

  onCancel = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{ marginRight: 10 }}>
          <Form>
            <Item>
              <Input
                value={this.state.title}
                placeholder="Title"
                autoFocus
                clearButtonMode="always"
                autoCorrect={false}
                onChange={this.onChangeTitle}
                onSubmitEditing={this.onAddDream}
                returnKeyType={"done"}
              />
            </Item>

            <Item>
              <Input
                value={this.state.dream}
                placeholder="Dream..."
                clearButtonMode="always"
                autoCorrect={false}
                onChange={this.onChangeText}
                onSubmitEditing={this.onAddDream}
                returnKeyType={"done"}
              />
            </Item>
          </Form>
        </View>
        <Card
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Title>{this.state.recordTime}</Title>
          <Button
            mode="contained"
            icon="record"
            onPress={() => this.startRecording()}
          >
            <Text>Record</Text>
          </Button>
          <Button
            icon="stop"
            mode="outlined"
            onPress={() => this.stopRecording()}
          >
            <Text>Stop</Text>
          </Button>
          <Title>
            {this.state.playTime} / {this.state.duration}
          </Title>
          <Button
            mode="contained"
            icon="play"
            // onPress={() => this.onStartPlay()}
          >
            <Text>Play</Text>
          </Button>

          <Button
            icon="pause"
            mode="contained"
            // onPress={() => this.onPausePlay()}
          >
            <Text>Pause</Text>
          </Button>
          <Button
            icon="stop"
            mode="outlined"
            // onPress={() => this.onStopPlay()}
          >
            <Text>Stop</Text>
          </Button>
        </Card>
        <PlaySound uri="./test.caf" />
        <FloatingCloseButton actionOnPress={this.onCancel} />
        <FloatingSaveButton actionOnPress={this.onAddDream} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29313c",
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: "#2f808b",
    flex: 1,
    width: "50%",
    justifyContent: "center",
  },
});

export default AddDreamScreen;

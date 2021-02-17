import React, {Component} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
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
} from 'native-base';
import Header from '../components/Header';
import FloatingSaveButton from '../components/FloatingSaveButton';
import FloatingCloseButton from '../components/FloatingCloseButton';
import RecordDream from '../components/RecordDream';

class AddDreamScreen extends Component {
  state = {
    text: '',
    title: '',
    checked: false,
  };

  onChangeResult = (result) => {
    console.log(result);
    this.setState({text: result});
  };

  onChangeTitle = (event) => {
    this.setState({title: event.nativeEvent.text});
  };

  onChangeText = (event) => {
    this.setState({text: event.nativeEvent.text});
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
        <View style={{marginRight: 10}}>
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
                returnKeyType={'done'}
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
                returnKeyType={'done'}
              />
            </Item>
          </Form>
        </View>

        <RecordDream setResults={this.onChangeResult} />

        <FloatingCloseButton actionOnPress={this.onCancel} />
        <FloatingSaveButton actionOnPress={this.onAddDream} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29313c',
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: '#2f808b',
    flex: 1,
    width: '50%',
    justifyContent: 'center',
  },
});

export default AddDreamScreen;

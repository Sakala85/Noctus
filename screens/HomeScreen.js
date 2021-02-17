import React, {Component} from 'react';
import _values from 'lodash.values';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid-random';
// import { AppLoading } from "expo-app-loading";
import * as Font from 'expo-font';
import FloatingButton from '../components/FloatingButton';
import FloatingAnalysisButton from '../components/FloatingAnalysisButton';
import Header from '../components/Header';
import Item from '../components/Item';

class HomeScreen extends Component {
  state = {
    dreams: {},
    isDataReady: false,
    filter: 'Dreams',
  };

  componentDidMount = () => {
    this.loadDreams();
  };

  loadDreams = async () => {
    try {
      await Font.loadAsync({
        // Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        // Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        // Ionicons: require('../node_modules/native-base/Fonts/Ionicons.ttf'),
      });

      const getDreams = await AsyncStorage.getItem('Dreams');
      console.log(getDreams);
      const parsedDreams = JSON.parse(getDreams);
      this.setState({isDataReady: true, dreams: parsedDreams || {}});
    } catch (err) {
      console.log(err);
      alert('Application Error. Cannot load data.');
    }
  };

  deleteDream = (id) => {
    this.setState((prevState) => {
      const dreams = prevState.dreams;
      delete dreams[id];
      const newState = {
        ...prevState,
        ...dreams,
      };
      this.saveDreams(newState.dreams);
      return {...newState};
    });
  };

  saveDreams = (newToDos) => {
    const saveDreams = AsyncStorage.setItem('dreams', JSON.stringify(newToDos));
  };

  addDream = (newDream) => {
    const newDreamItem = newDream;
    if (newDreamItem.title !== '') {
      this.setState((prevState) => {
        const ID = uuid();
        const newDreamObject = {
          [ID]: {
            id: ID,
            isFavorit: false,
            textValue: newDreamItem.text,
            titleValue: newDreamItem.title,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          dreams: {
            ...prevState.dreams,
            ...newDreamObject,
          },
        };
        console.log(newState);
        this.saveDreams(newState.dreams);
        return {...newState};
      });
    }
  };

  onPressFab = () => {
    this.props.navigation.navigate('AddTask', {
      saveItem: this.addDream,
      permission: this.state.permission,
    });
  };

  filteredItems = () => {
    if (this.state.filter === 'Dream') {
      return _values(this.state.dreams).filter((i) => {
        return !i.isFavorit;
      });
    }
    if (this.state.filter === 'Complete') {
      return _values(this.state.dreams).filter((i) => {
        return i.isFavorit;
      });
    }
    return this.state.dreams;
  };

  inCompleteDream = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        dreams: {
          ...prevState.dreams,
          [id]: {
            ...prevState.dreams[id],
            isFavorit: false,
          },
        },
      };
      this.saveDreams(newState.dreams);
      return {...newState};
    });
  };

  completeDream = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        dreams: {
          ...prevState.dreams,
          [id]: {
            ...prevState.dreams[id],
            isFavorit: true,
          },
        },
      };
      this.saveDreams(newState.dreams);
      return {...newState};
    });
  };

  filteredItems = () => {
    if (this.state.filter === 'Dreams') {
      return _values(this.state.dreams);
    }
    if (this.state.filter === 'Favorits') {
      return _values(this.state.dreams).filter((i) => {
        return i.isFavorit;
      });
    }
    return this.state.dreams;
  };

  toggleItem = (id, isFavorit) => {
    if (isFavorit) {
      this.inCompleteDream(id);
    } else {
      this.completeDream(id);
    }
  };

  setFavorits = (tmp) => {
    this.setState({filter: tmp});
  };

  render() {
    const {isDataReady, filter} = this.state;
    if (!isDataReady) {
      return <Text>Loading... </Text>;
    }
    return (
      <View style={styles.container}>
        {console.log(_values(this.filteredItems()))}
        <Header
          isFavorit={this.state.filter === 'Favorits'}
          setFavorits={this.setFavorits}
        />
        <FlatList
          data={_values(this.filteredItems())}
          contentContainerStyle={styles.content}
          renderItem={(row) => {
            return (
              <Item
                isFavorit={row.item.isFavorit}
                textValue={row.item.textValue}
                id={row.item.id}
                deleteDream={this.deleteDream}
                completeDream={this.completeDream}
                inCompleteDream={this.inCompleteDream}
                toggleItem={this.toggleItem}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <FloatingButton actionOnPress={this.onPressFab} />
        {/* <FloatingAnalysisButton actionOnPress={this.onPressFab} /> */}
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

export default HomeScreen;

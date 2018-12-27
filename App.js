import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import reducer from './reducer'
import { Provider } from 'react-redux'
import Decks from './components/Decks'
const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
     <Provider store={store}>
        <View>
          <Decks/>
        </View>
     </Provider>
    );
  }
}
import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux';
import reducer from './reducer'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import AddCard from './components/AddCard'
import DeckInfo from './components/DeckInfo'
import Quiz from './components/Quiz'
import AddDeck from './components/AddDeck'
import Results from './components/Results'

import { setLocalNotification } from "./api/api"

const store = createStore(reducer)
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

function FlashCardStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBar}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}



const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'darkblue' : 'white',
  },
  style: {
    height: 56,
    backgroundColor: Platform.OS === 'ios' ? 'white' : 'darkblue',
   
  },
  labelStyle: {
    fontSize: 14,
  },
}
)

const MainNavigator = createStackNavigator(
  {
      Home: {
          screen: Tabs,
      },
      DeckInfo: {
          screen: DeckInfo,
      },
      AddCard: {
        screen: AddCard,
      },
      Quiz: {
        screen: Quiz,
      },
      Results: {
        screen: Results,
      },

}, {
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black'
    }
  },
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
}
  render() {
    return (
     <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardStatusBar backgroundColor={'purple'} barStyle="light-content"/> 
          <MainNavigator/>
        </View>
     </Provider>
    );
  }
}
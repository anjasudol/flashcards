//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../api/api'
import { receiveDecks } from '../actions'
import { Asset, AppLoading } from 'expo';
import Deck from './Deck'

// create a component
class Decks extends Component {
    state= {
        ready: false
    }
    componentDidMount() {
        fetchDeckResults()
        .then((decks)=> this.props.dispatch(receiveDecks(decks)))
        .then(()=> this.setState({ready: true}))
    }


    renderItem = ({ item }) => (
        <TouchableOpacity 
          style={{ borderBottomWidth: 1, borderBottomColor: 'black', }} 
        //   onPress={() => navigation.navigate('DeckInfo', { deckTitle: item.title })}
        >
          <Deck {...item}/>
        </TouchableOpacity>
      )

    render() {
        const { decks } = this.props
        if(this.state.ready ===false) {
            return <AppLoading/>
        }
        return (
            <View style={styles.container}>
                <FlatList 
                    data={Object.values(decks)}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingTop: 50,
      justifyContent: 'center',
    },
    header: {
      fontSize: 12,
      fontFamily: 'Cochin'
    }
  })

function mapStateToProps (decks) {
    return { decks }
}
  
export default connect(mapStateToProps)(Decks)

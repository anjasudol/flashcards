//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { fetchDeckResults } from '../api/api'
import { receiveDocks } from '../actions'

// create a component
class Decks extends Component {
    componentDidMount() {
        fetchDeckResults()
        .then((decks)=> this.props.dispatch(receiveDocks(decks)))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Decks</Text>
              
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

function mapStateToProps (decks) {
    console.log(Object.values(decks))
    console.log(Object.keys(decks))
    return { decks }
  }
  
export default connect(mapStateToProps)(Decks)

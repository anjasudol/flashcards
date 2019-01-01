//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Button from './Button'
import { addDeckData } from '../api/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'


// create a component
class AddDeck extends Component {
    state={
        title: '',
        error: false,
    }
    submit=()=>{

        let deckTitle = this.state.title.trim().charAt(0).toUpperCase() + this.state.title.trim().slice(1);

        if (this.props.allDecks.includes(deckTitle)) {
            Alert.alert('There is already a deck with that name!')
        } else if (deckTitle.length) {
            this.props.addNewDeck(addDeckData(deckTitle))
            this.props.navigation.navigate('DeckInfo', { titleId: deckTitle, error: false })
            this.setState({title: ''});
        } else if (!deckTitle.length) { (this.setState(()=>({error: true})))}
    }

    render() {
        return (
            <View style={styles.container}>
                 <TextInput
                    style={[styles.input, this.state.error && !this.state.title ? styles.waring : null]}
                    onChangeText={(title) => this.setState({title})}
                    placeholder="Add a deck's name"
                    value={this.state.title}
                />
                
            <Button text='Add a new deck' onPress={this.submit}/>
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
        backgroundColor: '#fff',
    },
    input: {
        marginTop: 50,
        height: 40,
        width: 250,
        padding: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
    },
    waring: {
        borderColor: 'red'
    },
    alertText: {
        color: 'darkred',
        fontSize: 20,
        marginTop: 50
    }
});

function mapStateToProps (decks){

    return {
        allDecks: Object.keys(decks)
    }
}
//make this component available to the app
function mapDispatchToProps (dispatch) {
    return {
      addNewDeck: (deck) => {
        dispatch(addDeck(deck))
      }
    }
  }
  
  export default connect( mapStateToProps, mapDispatchToProps )(AddDeck)

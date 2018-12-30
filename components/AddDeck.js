//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from './Button'
import { addDeckData } from '../api/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
// create a component
class AddDeck extends Component {
    state={
        title: '',
        error: false
    }
    submit=()=>{
        const deckTitle = this.state.title.trim()
        deckTitle.length && this.props.addNewDeck(addDeckData(deckTitle))

        deckTitle.length && this.setState({title: ''});

        deckTitle.length && this.props.navigation.navigate('DeckInfo', { titleId: deckTitle })

        !deckTitle.length && this.setState({error: true});
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
    }
});


//make this component available to the app
function mapDispatchToProps (dispatch) {
    return {
      addNewDeck: (deck) => {
        dispatch(addDeck(deck))
      }
    }
  }
  
  export default connect( null, mapDispatchToProps )(AddDeck)

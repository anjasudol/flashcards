//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux'
import Button from './Button'
import { addCard } from '../actions'
import { addQuestionData } from '../api/api'
// create a component
class AddCard extends Component {
    state ={
        question: '',
        answer: ''
    }
    submit =()=>{
        const { question, answer } = this.state
        const { titleId } = this.props
        if(question.length  && answer.length) {
            question.trim()
            answer.trim()
            const newCard = {question, answer}
            addQuestionData(titleId, question, answer)
            this.props.addNewCard(titleId, newCard)
            this.props.navigation.navigate('DeckInfo')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                 <TextInput
                    style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    placeholder='Add a question'
                    value={this.state.question}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    placeholder='Add an answer'
                    value={this.state.answer}
                />
                <Button text='Add card' onPress={this.submit}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        // paddingTop: 200,
        alignItems: 'center',

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
    btn: {
        backgroundColor: '#2c3e50',
        padding: 10,
        borderRadius: 5,
        marginTop: 50,
        height: 45,

    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
    },
});
function mapStateToProps (decks,{ navigation }) {
    const { titleId } = navigation.state.params
    console.log(decks[titleId])
    return {
        decks,
        titleId
    }
}

function mapDispatchToProps (dispatch) {
    return {
      addNewCard: (titleId, {question, answer}) => {
        dispatch(addCard(titleId, {question, answer}))
      }
    }
  }

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

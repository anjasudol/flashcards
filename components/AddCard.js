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
        answer: '',
        error: false
    }
    submit =()=>{
        const { question, answer } = this.state
        const { titleId, navigation, addNewCard } = this.props
        if(question.length  && answer.length) {
            console.log(titleId)
            question.trim()
            answer.trim()
            const newCard = {question, answer}
            addQuestionData(titleId, question, answer)
            addNewCard(titleId, newCard)
            navigation.navigate('DeckInfo', {titleId: titleId})
        } else {
            this.setState({error: true});
        }
    }
    render() {
        const { error, question, answer } = this.state
        return (
            <View style={styles.container}>
                 <TextInput
                    style={[styles.input, (error && !question && !answer) ? styles.waring : null]}
                    onChangeText={(question) => this.setState({question})}
                    placeholder='Add a question'
                    value={this.state.question}
                />
                <TextInput
                    style={[styles.input, (error && !question && !answer) ? styles.waring : null]}
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
    waring: {
        borderColor: 'red'
    },
});
function mapStateToProps (decks,{ navigation }) {
    const { titleId } = navigation.state.params
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

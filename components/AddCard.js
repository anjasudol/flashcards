//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux'
import Button from './Button'

// create a component
class AddCard extends Component {
    state ={
        question: '',
        answer: ''
    }
    submit =()=>{
        if(this.state.question.length > 10 && this.state.answer.length > 10) {

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

function mapStateToProps (decks) {
    return {
        decks,
    }
}
//make this component available to the app
export default connect(mapStateToProps)(AddCard);

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Results extends Component {
    render() {
        const {points, totalQuestions, titleId} = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{titleId} Quiz Results</Text>
                <Text style={styles.text}>Total points: {points} of {totalQuestions} </Text>            
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
    title: {
        fontSize: 40,
        color: 'grey',
        textAlign: 'center'
    },
    text: {
        marginTop: 30,
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});

//make this component available to the app
export default Results;

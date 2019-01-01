//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import Button from './Button'
import { setLocalNotification, clearLocalNotification } from "./api/api"

// create a component
class Results extends Component {
    static navigationOptions = ({ navigation }) => {
		return {
            title: "Go back",
            headerLeft: <HeaderBackButton tintColor={'white'} onPress={() => navigation.navigate('DeckInfo')} />,
		    }
        }
    componentDidMount(){
        clearLocalNotification()
            .then(setLocalNotification)
        }
    render() {
        const {points, totalQuestions, titleId, navigation} = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{titleId} Quiz Results</Text>
                <Text style={styles.text}>Total points: {points} of {totalQuestions} </Text>
                <Button text='Restart quiz' onPress={()=> navigation.navigate('Quiz', { titleId: titleId })}/>
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

function mapStateToProps (decks,{ navigation }) {
    const { titleId, totalQuestions, points } = navigation.state.params
    console.log('id', titleId, totalQuestions, points)
    return {
        titleId, totalQuestions, points
    }
}
//make this component available to the app

export default connect(mapStateToProps)(Results);

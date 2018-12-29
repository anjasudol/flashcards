//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import Button from './Button'
import { HeaderBackButton, NavigationActions } from 'react-navigation'

// create a component
class DeckInfo extends Component {
    static navigationOptions = ({ navigation }) => {
		return {
            title: navigation.state["params"].titleId,
            headerLeft: <HeaderBackButton tintColor={'white'} onPress={() => navigation.navigate('Home')} />,
		    }
        }

    render() {
        const { deckInfo, navigation } = this.props
        const questions = deckInfo.questions

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{deckInfo.title}</Text>
                <Text style={styles.subtitle}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>
                {questions.length > 0 ? <Button text='Start quiz' onPress={()=> navigation.navigate('Quiz')}/> : <Text style={styles.text}>To start the quiz you must add at least one card</Text>}
                <Button text='Add Card' backCol='grey' onPress={()=> navigation.navigate('AddCard', { titleId: deckInfo.title })}/>
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
        backgroundColor: '#D0D0D0',
    },
    title : {
		fontSize: 28,
		color: 'black',
        paddingBottom: 10
	},
	subtitle : {
		fontSize: 15,
		color: 'grey'
    },
    text: {
        paddingTop: 60,
        paddingHorizontal: 60,
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    }
});
  
  
function mapStateToProps (decks,{ navigation }) {
    const { titleId } = navigation.state.params
    return {
        decks,
        deckInfo: decks[titleId],
        titleId
    }
}
//make this component available to the app
export default connect(mapStateToProps)(DeckInfo);

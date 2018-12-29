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
        const questions = this.props.deckInfo.questions
        console.log(questions.length)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.deckInfo.title}</Text>
                <Text style={styles.subtitle}>{questions.length} {questions.length > 1 ? 'cards' : 'card'}</Text>
                <Button text='Start quiz' onPress={()=> this.props.navigation.navigate('Quiz')}/>
                <Button text='Add Card' backCol='grey' onPress={()=> this.props.navigation.navigate('AddCard')}/>
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
	}
});
function mapStateToProps (decks, props) {
    const titleID =props.navigation.state.params.titleId
    return {
        decks,
        deckInfo: decks[titleID]
    }
}
//make this component available to the app
export default connect(mapStateToProps)(DeckInfo);

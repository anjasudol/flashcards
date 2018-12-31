//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import Button from './Button'
import Results from './Results'

// create a component
class Quiz extends Component {
    
    static navigationOptions = ({ navigation }) => {
		return {
            title: navigation.state["params"].titleId + " quiz",
            headerLeft: <HeaderBackButton tintColor={'white'} onPress={() => navigation.navigate('DeckInfo')} />,
		    }
        }
    state= {
        index: 0,
        point: 0,
        showAnswer: false
    }
    correct=()=>{
        const { index, point } = this.state
        this.setState({index: index + 1});
        this.setState({point: point + 1});
        this.setState({showAnswer: false});
    }

    inCorrect=()=>{
        const { index } = this.state
        this.setState({index: index + 1});
        this.setState({showAnswer: false});

    }
    render() {
        const { cards, titleId } = this.props
        const { index, showAnswer } = this.state

        if(cards.length === index) {
            return <Results points={this.state.point} totalQuestions={cards.length} titleId={titleId}/>
        }
        return (
            <View style={styles.container}>
                <Text style={styles.number}>{index + 1}/{cards.length}</Text>
                {showAnswer ? <Text style={styles.text}>{cards[index].answer}</Text> : <Text style={styles.text}>{cards[index].question}</Text> }
                <Button text={showAnswer ? 'show question' : 'show answer' } onPress={()=> this.setState({showAnswer: !this.state.showAnswer})}/>

                <Button text='correct' backCol='green' onPress={this.correct}/>
                <Button text='incorrect' backCol='red' onPress={this.inCorrect}/>
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
    number : {
		fontSize: 25,
		color: 'grey'
    },
    text: {
        paddingTop: 60,
        paddingHorizontal: 60,
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    }
});

function mapStateToProps (decks,{ navigation }) {
    const { titleId } = navigation.state.params

    return {
        cards: decks ? decks[titleId].questions : null,
        titleId
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Quiz);

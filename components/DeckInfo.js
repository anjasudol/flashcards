//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
// create a component
class DeckInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>DeckInfo</Text>
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
        backgroundColor: '#2c3e50',
    },
});
function mapStateToProps ({decks}, props) {
    const deckTitle = props.match.params
    return {
        decks
    }
}
//make this component available to the app
export default connect(mapStateToProps)(DeckInfo);

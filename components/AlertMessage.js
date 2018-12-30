//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
export default function AlertMessage ({text}) {
    return (
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    text: {
        paddingHorizontal: 60,
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    }
});


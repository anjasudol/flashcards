import React from 'react'
import { View, StyleSheet, Text  } from 'react-native'

export default function Deck ({ title, questions }) {
	return (
	  <View style={styles.card}>
      <Text style={styles.titleOne}>{title}</Text>
      <Text style={styles.titleTwo}>{questions.length} cards</Text>
	  </View>
	)
  }

const styles = StyleSheet.create({
	card: {
      flex: 1,
      padding: 30,
			alignItems: 'center',
	},
	titleOne : {
		fontSize: 17,
		color: 'black'
	},
	titleTwo : {
		fontSize: 15,
		color: 'grey'
	}
})
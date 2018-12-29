import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

export default function Button ({ onPress, text, backCol }) {

	return (
		<TouchableOpacity
            style={[ styles.btn,{ backgroundColor: backCol ? backCol : '#000' }]}
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>{text}</Text>
		</TouchableOpacity>
	)

}

const styles = StyleSheet.create({
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
})
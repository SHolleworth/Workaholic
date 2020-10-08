import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 20,
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: 'white',
        marginBottom: 5,
        opacity: 1,
    },
    currentTime: {
        color: 'white',
        fontFamily: 'Lato-Light',
        fontSize: 30,
        marginBottom: 5,
    },
    totalTime: {
        color: 'white',
        fontFamily: 'Lato-Light',
        fontSize: 15,
        marginBottom: 5,
    }
});

export default styles;
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        marginTop: 10,
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50
    },
    text: {
        fontFamily: 'Lato-Light',
        fontSize: 30,
        color: 'white',
    }
});

export default styles;
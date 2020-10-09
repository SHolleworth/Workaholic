import React, { useState } from 'react';
import {Image, TouchableWithoutFeedback, View, Text} from 'react-native';
import styles from './styles'

const NavigationTouchable = ({id, activeScreen, img, transitionScreen}) => {

    const [pressed, setPressed]= useState(0);

    const handlePress = () => {
        transitionScreen(id);
    }

    const handlePressIn = () => {
        setPressed(1);
    }

    const handlePressOut = () => {
        setPressed(0);
    }

    const checkIfActive = () => {
        return activeScreen == id;
    }

    return (
        <TouchableWithoutFeedback 
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={activeScreen === id ? true : false}
            >
            <View style={[styles.container,
                        {
                            opacity : pressed ? 1.0 : checkIfActive() ? 1.0 : 0.3,
                        }
                        ]}>
                <Image 
                    style={styles.image} source={img}/>
                <Text style={[styles.text]}>{id ? "Set Time" : "Timer"}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default NavigationTouchable;
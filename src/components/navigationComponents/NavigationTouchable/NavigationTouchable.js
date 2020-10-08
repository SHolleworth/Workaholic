import React, { useState } from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
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
        onPressOut={handlePressOut}>
            <View style={styles.container}>
                <Image 
                style={[styles.image, 
                    {
                        opacity : pressed ? 1.0 : checkIfActive() ? 1.0 : 0.5,
                    }
                    ]} source={img}/>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default NavigationTouchable;
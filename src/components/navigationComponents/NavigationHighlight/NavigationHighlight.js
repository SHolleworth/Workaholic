import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles'

const NavigationHighlight = ({progress}) => {
    const width = useWindowDimensions().width / 2;

    const translateX = Animated.interpolate(progress,
        {
            inputRange: [0, 1],
            outputRange: [0, width]
        })

    return (
        <Animated.View style={[styles.container, { width, transform:[{ translateX }] }]}>
        </Animated.View>
    );
};

export default NavigationHighlight;
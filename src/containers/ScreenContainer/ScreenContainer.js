import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import TimerScreen from '../../screens/TimerScreen';
import NavigationContainer from '../NavigationContainer';
import styles from './styles';

const ScreenContainer = () => {
    return (
        <View style={[styles.container, {width: useWindowDimensions().width * 2}]}>
            <TimerScreen />
            <NavigationContainer />
        </View>
    );
};

export default ScreenContainer;
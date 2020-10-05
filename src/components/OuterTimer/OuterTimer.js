import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions, Button} from 'react-native';
import CircleTimer from '../../components/CircleTimer';
import NumericTimer from '../../components/NumericTimer';
import dimensions from '../../constants/dimensions';
import styles from './styles';

const OuterTimer = ({mode, timerTime, timerAnimProgress}) => {
    const svgSize = useWindowDimensions().width * dimensions.WINDOW_WIDTH_MODIFIER;

    return (
        <View style={[styles.container]}>
            <CircleTimer radius={svgSize} mode={mode} progress={timerAnimProgress}/>
            <NumericTimer radius={svgSize} interval={timerTime}/>
        </View>
    );
};

export default OuterTimer;
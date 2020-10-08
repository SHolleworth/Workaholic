import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import CircleTimer from '../CircleTimer';
import NumericTimer from '../NumericTimer';
import dimensions from '../../../constants/dimensions';
import colors from '../../../constants/colors';
import styles from './styles';

const OuterTimer = ({mode, timerTime, timerAnimProgress}) => {
    const svgSize = useWindowDimensions().width * dimensions.WINDOW_WIDTH_MODIFIER;

    const textWidth = svgSize * 1;
    const textHeight = svgSize * .2;
    const textPos = {
      top : svgSize - textHeight/2 + 60,
      left : svgSize - textWidth/2,
      borderRadius : textHeight/2,
    }

    return (
        <View style={[styles.container]}>
            <CircleTimer radius={svgSize} mode={mode} progress={timerAnimProgress}/>
            <View style={[styles.textContainer, {height: textHeight, width: textWidth, ...textPos}]}>
                <Text style={[styles.text, {color : mode ? colors.WORK_HIGHLIGHT : colors.BREAK_HIGHLIGHT}]}>
                    {mode ? "Work" : "Break"}
                </Text>
            </View>
            <NumericTimer radius={svgSize} interval={timerTime}/>
        </View>
    );
};

export default OuterTimer;
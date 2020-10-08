import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import colors from '../../../constants/colors';
import styles from './styles'

const ModeSelectHighlight = ({mode, progress}) => {
    const width = useWindowDimensions().width * .5;

    const inputRange = [0,1];
    const translation = interpolate(progress,
        {
            inputRange,
            outputRange: [0, width],
        });

    const borderRadii = {
        borderTopLeftRadius: interpolate(progress, { inputRange, outputRange: [10, 60] }),
        borderTopRightRadius: interpolate(progress, { inputRange, outputRange: [60, 10] }),
        borderBottomLeftRadius: interpolate(progress, { inputRange, outputRange: [60, 30] }),
        borderBottomRightRadius: interpolate(progress, { inputRange, outputRange: [30, 60] }),
    }

    return (
        <Animated.View style={[
            styles.highlight,
            {
                height: useWindowDimensions().height / 6,
                backgroundColor: colors.SECONDARY,
                width: width,
                borderRadius: 30,
                transform: [{translateX: translation}],
            },
            {...borderRadii}]}>
        </Animated.View>
    );
};

export default ModeSelectHighlight;
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg'
import colors from '../../constants/colors';
import navDimensions from '../../constants/navDimensions';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LayoutCircle = ({mode, progress}) => {

    const radius = (useWindowDimensions().width *.5);
    const diameter = radius * 2;

    const translation = interpolate(progress,
        {
            inputRange: [0,1],
            outputRange: [diameter*2 - navDimensions.NAV_HEIGHT * 1.6, 0]
        }) 

    return (
        <View 
        style={{position: 'absolute',
        top:0, right: 0, bottom: 0, left: 0,
        zIndex: -1,}}
        >
            <Svg height={useWindowDimensions().height} width={diameter}>
                <AnimatedCircle 
                cx={radius} cy={translation} r={radius + 1}
                fill={colors.DARK}
                />
            </Svg>
        </View>
    );
};

export default LayoutCircle;
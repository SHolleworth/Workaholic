import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg'
import colors from '../../constants/colors';
import styles from './styles'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LayoutCircle = () => {

    const radius = useWindowDimensions().width *.5;
    const diameter = radius * 2;

    return (
        <View 
        style={{position: 'absolute',
        top:radius * 2.6, right: 0, bottom: 0, left: 0,
        zIndex: -1,}}
        >
            <Svg height={diameter} width={diameter}>
                <AnimatedCircle 
                cx={radius} cy={radius} r={radius}
                fill={colors.PRIMARY}
                />
            </Svg>
        </View>
    );
};

export default LayoutCircle;
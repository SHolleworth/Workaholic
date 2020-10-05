import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import colors from '../../constants/colors'
import Animated from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';
import styles from './styles';

const {
  interpolate,
  Value,
  multiply,
  useCode,
  set,
} = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleTimer = (props) => {
  const fullRad = props.radius;
  const innerRad = (fullRad/2);
  const boxDimensions = (fullRad*2) + 6;
  const circumference = (fullRad * 2 * Math.PI) + "";

  const alpha = useRef(new Value(0)).current;
  const strokeDashoffset = useRef(new Value(0)).current;
  useCode(() => [
    set(alpha, interpolate(props.progress,
                            {
                              inputRange: [0,1],
                              outputRange: [2 * Math.PI, 0],
                            })),
    set(strokeDashoffset, multiply(alpha,fullRad)),
  ],[])

  return (
    <Svg height={boxDimensions + ""} width={boxDimensions + ""}>
      <Circle
        cx={props.radius + 3} cy={props.radius + 3} r={fullRad}
        stroke={colors.PRIMARY}
        strokeWidth={4} />
      <AnimatedCircle cx={props.radius - 3} cy={props.radius + 3} r={fullRad}
        stroke={props.mode ? colors.WORK_HIGHLIGHT: colors.BREAK_HIGHLIGHT}
        strokeWidth={5}
        strokeDasharray={`${circumference} ${circumference}`}
        origin={(fullRad, fullRad)}
        rotation={"-90"}
        strokeOpacity={props.opacity}
        strokeLinecap={'round'}
        {...{strokeDashoffset}} />
    </Svg>
  );
}

export default CircleTimer;

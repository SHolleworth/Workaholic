import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions} from 'react-native';
import TimerScreen from '../../screens/TimerScreen';
import Navigation from '../../components/navigationComponents/Navigation';
import LayoutCircle from '../../components/LayoutCircle';
import styles from './styles';
import TimerSettingsScreen from '../../screens/TimeSettingsScreen/TimeSettingsScreen';
import Animated, { cond, Easing, interpolate, stopClock } from 'react-native-reanimated';

const {
    Clock,
    clockRunning,
    and,
    call,
    block,
    not,
    set,
    startClock,
    useCode,
    timing,
    Value 
} = Animated;

const screenTransition = (clock, finish) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: new Value(500),
        toValue: new Value(1),
        easing: Easing.inOut(Easing.ease),
    };

    return (block([
        cond(state.finished,
        [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, not(config.toValue)),
            call([], finish),
            stopClock(clock),
        ]),
        cond(clockRunning(clock), timing(clock, state, config)),
        state.position
    ]));
}

const ScreenContainer = () => {
    const width =  useWindowDimensions().width * 2;

    const [mode, setMode] = useState(1);
    const [activeScreen, setActiveScreen] = useState(0);
    const [totalWorkTime, setTotalWorkTime] = useState(25*60000);
    const [totalBreakTime, setTotalBreakTime] = useState(5*60000);

    const [playing, setPlaying] = useState(0);
    const clock = useRef(new Clock()).current;
    const progress = useRef(new Value(0)).current;
    const isPlaying = useRef(new Value(playing)).current;

    useCode(() => set(isPlaying, playing), [playing]);

    useCode(() => [
        cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
        cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
        set(progress, screenTransition(clock, endScreenTransition))
    ],[]);

    const translateX = interpolate(progress,
        {
            inputRange: [0,1],
            outputRange: [0, -width/2]
        });

    const endScreenTransition = () => {
        setPlaying(0);
    }

    const transitionScreen = (screenId) => {
        setActiveScreen(screenId);
        setPlaying(1);
    }

    return (
        <View style={[ styles.container, { width } ]}>
            <Animated.View style={{ flexDirection: 'row', transform:[{ translateX }] }}>
                <TimerScreen
                    mode={mode}
                    setMode={setMode}
                    totalWorkTime={totalWorkTime}
                    totalBreakTime={totalBreakTime}
                />
                <TimerSettingsScreen
                    mode={mode}
                    setMode={setMode}
                    setTotalWorkTime={setTotalWorkTime}
                    setTotalBreakTime={setTotalBreakTime}
                    transitionScreen={transitionScreen}
                />
            </Animated.View>
            <Navigation 
                progress={progress} 
                activeScreen={activeScreen}
                transitionScreen={transitionScreen}
            />
            <LayoutCircle mode={mode} progress={progress}/>
        </View>
    );
};

export default ScreenContainer;
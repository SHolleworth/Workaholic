import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions} from 'react-native';
import screenTransition from '../../animations/screenTransition';
import TimerScreen from '../../screens/TimerScreen';
import Navigation from '../../components/navigationComponents/Navigation';
import LayoutCircle from '../../components/LayoutCircle';
import styles from './styles';
import TimerSettingsScreen from '../../screens/TimeSettingsScreen/TimeSettingsScreen';
import Animated from 'react-native-reanimated';

const {
    Clock,
    cond,
    interpolate,
    stopClock, 
    clockRunning,
    and,
    not,
    set,
    startClock,
    useCode,
    Value 
} = Animated;

const ScreenContainer = ({totalWorkTime, totalBreakTime, setTotalWorkTime, setTotalBreakTime}) => {
    const width =  useWindowDimensions().width * 2;

    const [mode, setMode] = useState(1);
    const [activeScreen, setActiveScreen] = useState(0);

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
                    totalWorkTime={totalWorkTime}
                    totalBreakTime={totalBreakTime}
                    setTotalWorkTime={setTotalWorkTime}
                    setTotalBreakTime={setTotalBreakTime}
                    transitionScreen={transitionScreen}
                />
            </Animated.View>
            <Navigation
                mode={mode}
                progress={progress} 
                activeScreen={activeScreen}
                transitionScreen={transitionScreen}
            />
            <LayoutCircle mode={mode} progress={progress}/>
        </View>
    );
};

export default ScreenContainer;
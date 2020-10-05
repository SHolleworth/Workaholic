import React, { useRef, useState } from 'react';
import {View} from 'react-native';
import Animated, { call, Easing } from 'react-native-reanimated';
import ModeSelectHighlight from '../../components/ModeSelectHighlight';
import ModeSelectTouchable from '../../components/ModeSelectTouchcble';
import styles from './styles'

const {
    Clock,
    startClock,
    stopClock,
    clockRunning,
    Value,
    timing,
    block,
    cond,
    set,
    and,
    not,
    useCode,
} = Animated;

const runTiming = (clock, toValue, finish) => {
    const state = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: 500,
        toValue,
        easing: Easing.inOut(Easing.ease),
    }

    return(block([
        cond(state.finished,
            [
                set(state.time, 0),
                set(state.frameTime, 0),
                set(state.finished, 0),
                call([], finish),
                stopClock(clock),
            ]),
        cond(clockRunning(clock), 
            [
                timing(clock, state, config),
            ]),
        state.position
    ]));
}

const ModeControls = ({mode, setMode, progress, stopModeAnim, totalWorkTime, totalBreakTime, displayWorkTime, displayBreakTime}) => {

    const [playing, setPlaying] = useState(0);
    const [dest, setDest] = useState(0);

    const clock = useRef(new Clock()).current;
    const isPlaying = useRef(new Value(0)).current;
    const toValue = useRef(new Value(0)).current;

    useCode(() => set(isPlaying, playing), [playing])

    useCode(() => set(toValue, dest), [dest]);

    useCode(() => [
        cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
        cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
        set(progress, runTiming(clock, toValue, finish))
    ],[])

    const setModeWithAnim = (id,dest) => {
        if(!playing){
            setMode(id)
            setDest(dest);
            setPlaying(1);
        }
    }

    const finish = () => {
        setPlaying(0);
        stopModeAnim()
    }

    return (
        <View style={styles.container}>
            <ModeSelectHighlight mode={mode} progress={progress}/>
            <ModeSelectTouchable 
            id={1}
            setModeWithAnim={setModeWithAnim}
            activeTime={displayWorkTime}
            totalTime={totalWorkTime}
            />
            <ModeSelectTouchable
            id={0}
            setModeWithAnim={setModeWithAnim}
            activeTime={displayBreakTime}
            totalTime={totalBreakTime}
            />
        </View>
    );
};

export default ModeControls;
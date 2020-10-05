import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PlayPauseStopButton from '../PlayPauseStopButton';
import ResetButton from '../ResetButton';
import styles from './styles';
import Animated , { Easing } from 'react-native-reanimated';

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
    call,
    useCode,
    greaterThan,
} = Animated;

const runTiming = (clock, finish) => {
    const state = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: 500,
        toValue: new Value(1),
        easing: Easing.inOut(Easing.ease),
    }

    return(block([
        cond(state.finished,
            [
                set(state.time, 0),
                set(state.frameTime, 0),
                set(state.finished, 0),
                set(state.position, 0),
                stopClock(clock),
                call([], finish),
            ]),
        cond(clockRunning(clock), 
            [
                timing(clock, state, config),
            ]),
        cond(greaterThan(state.position, 0), state.position, new Value(1))
    ]));
}

const TimerControls = ({mode, progress, playing, play, pause, reset, finishReset}) => {

    const [animPlaying, setAnimPlaying] = useState(0);

    const clock = useRef(new Clock()).current;
    const isPlaying = useRef(new Value(0)).current;
    const toValue = useRef(new Value(0)).current;

    useCode(() => set(isPlaying, animPlaying), [animPlaying])

    useCode(() => [
        cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
        cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
        set(progress, runTiming(clock, finish))
    ],[])

    const finish = () => {
        finishReset();
        setAnimPlaying(0);
    }

    const resetWithAnim = () => {
        setAnimPlaying(1);
        reset();
    }

    return (
        <View style={{marginTop: 20, alignItems: 'center'}}>
            <PlayPauseStopButton
            mode={mode}
            playing={playing}
            play={play}
            pause={pause}
            />
            <ResetButton reset={resetWithAnim} />
        </View>
    );
};

export default TimerControls;
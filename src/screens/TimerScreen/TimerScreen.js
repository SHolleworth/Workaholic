import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import BackgroundTimer from 'react-native-background-timer';
import OuterTimer from '../../components/OuterTimer';
import ModeControls from '../../components/ModeControls';
import TimerControls from '../../components/TimerControls';
import styles from './styles'
import LayoutCircle from '../../components/LayoutCircle/LayoutCircle';

const {
    Value,
    Clock,
    interpolate,
    clockRunning,
    startClock,
    stopClock,
    useCode,
    timing,
    block,
    cond,
    and,
    not,
    set,
    call,
} = Animated;

const runCircleTiming = (clock, duration, isResetting, finish, finishReset) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: duration,
        toValue: new Value(1),
        easing: Easing.linear,
    };

    return (block([
        cond(and(not(clockRunning(clock)), not(state.finished)), [
            set(state.time, 0),
        ]),
        cond(isResetting, [
            set(state.position, not(config.toValue)),
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            call([], finishReset)
        ]),
        cond(state.finished,
        [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            call([], finish),
            stopClock(clock),
        ]),
        cond(clockRunning(clock), timing(clock, state, config)),
        state.position,
    ]));
}

const TimerScreen = () => {

    const [mode, setMode] = useState(1);
    const [totalWorkTime, setTotalWorkTime] = useState(10000);
    const [totalBreakTime, setTotalBreakTime] = useState(5000);
    const [elapsedWorkTime, setElapsedWorkTime] = useState(0);
    const [elapsedBreakTime, setElapsedBreakTime] = useState(0);
    const [displayedWorkTime, setDisplayedWorkTime] = useState(10000);
    const [displayedBreakTime, setDisplayedBreakTime] = useState(5000);
    const [timerTime, setTimerTime] = useState(10000);

    const [resetting, setResetting] = useState(0);
    const [playing, setPlaying] = useState(0);
    const [modeAnimPlaying, setModeAnimPlaying] = useState(0)
    const [resetAnimPlaying, setResetAnimPlaying] = useState(0);
    const interval = useRef(null);

    const clock = useRef(new Clock()).current;
    const isResetting = useRef(new Value(0)).current;
    const isPlaying = useRef(new Value(0)).current;
    const isModeAnimPlaying = useRef(new Value(0)).current;
    const isResetAnimPlaying = useRef(new Value(0)).current;
    const isMode = useRef(new Value(1)).current;
    const modeAnimProgress = useRef(new Value(0)).current;
    const resetAnimProgress = useRef(new Value(0)).current;
    const workCircleAnimProgress = useRef(new Value(0)).current;
    const breakCircleAnimProgress = useRef(new Value(0)).current;
    const workCircleAnimDuration = useRef(new Value(10000)).current;
    const breakCircleAnimDuration = useRef(new Value(5000)).current;
    const timerAnimProgress = useRef(new Value(0)).current;

    useEffect(() => {
        handleInterval();
        return (() => {
            BackgroundTimer.clearInterval(interval.current);
        })
    },[playing])

    useEffect(() => {
        resetting ? mode ? resetWork() : resetBreak() : null;
    },[resetting])

    useCode(() => set(isPlaying, playing), [playing]);

    useCode(()=> set(isModeAnimPlaying, modeAnimPlaying), [modeAnimPlaying]);

    useCode(()=> set(isResetAnimPlaying, resetAnimPlaying), [resetAnimPlaying]);

    useCode(() => set(isMode, mode), [mode]);

    useCode(() => set(isResetting, resetting), [resetting]);

    useCode(() => [
        cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
        cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
        cond(isMode,
            [
                set(workCircleAnimProgress, runCircleTiming
                    (
                        clock,
                        workCircleAnimDuration,
                        isResetting, 
                        finish,
                        finishReset
                    )),
                set(timerAnimProgress, workCircleAnimProgress),
            ],
            [
                set(breakCircleAnimProgress, runCircleTiming
                    (
                        clock,
                        breakCircleAnimDuration,
                        isResetting, 
                        finish,
                        finishReset,
                    )),
                set(timerAnimProgress, breakCircleAnimProgress),
            ]),
        cond(isModeAnimPlaying, set(timerAnimProgress, interpolate(modeAnimProgress,
            {
                inputRange: [0,1],
                outputRange: [workCircleAnimProgress, breakCircleAnimProgress],
            }))),
        cond(isResetAnimPlaying, 
            [
                set(timerAnimProgress, interpolate(resetAnimProgress,
                {
                    inputRange: [0, 1],
                    outputRange: [cond(isMode, workCircleAnimProgress, breakCircleAnimProgress), 0]
                })),
            ])
    ],[]);

    const handleInterval = () => {
        interval.current = getInterval();
        if(!playing) {
            BackgroundTimer.clearInterval(interval.current);
        }
    }

    const getInterval = () => {
        const startTime = Date.now();
        let interval = BackgroundTimer.setInterval(() => {
            const time = Date.now() - startTime;
            updateTimes(time);
        }, 100);
    return interval;
    }

    const updateTimes = (time) => {
        mode ? setElapsedWorkTime(elapsedWorkTime + time) : setElapsedBreakTime(elapsedBreakTime + time);
    }

    useEffect(() => {setDisplayedWorkTime(totalWorkTime - elapsedWorkTime)}, [elapsedWorkTime])

    useEffect(() => {setDisplayedBreakTime(totalBreakTime - elapsedBreakTime)}, [elapsedBreakTime])

    useEffect(() => {setTimerTime(mode ? displayedWorkTime : displayedBreakTime)}, [displayedWorkTime, displayedBreakTime, mode])

    const play = () => {
        if(!resetAnimPlaying){
            setPlaying(true);
        }
    }

    const pause = () => {
        setPlaying(false);
    }

    const reset = () => {
        pause();
        setResetAnimPlaying(1);
    }

    const stopResetAnim = () => {
        setResetAnimPlaying(0);
        setResetting(1);
    }

    const finishReset = () => {
        setResetting(0);
    }

    const resetWork = () => {
        setElapsedWorkTime(0);
        setDisplayedWorkTime(totalWorkTime);
    }

    const resetBreak = () => {
        setElapsedBreakTime(0);
        setDisplayedBreakTime(totalBreakTime);
    }

    const finish = () => {
        pause();
    }

    const changeMode = (id) => {
        pause();
        setModeAnimPlaying(1);
        setMode(id);
    }

    const stopModeAnim = () => {
        setModeAnimPlaying(0);
    }

    return (
        <View style={{alignItems: 'center', width: useWindowDimensions().width,}}>
            <OuterTimer
            mode={mode}
            timerTime={timerTime}
            timerAnimProgress={timerAnimProgress}
            />
            <ModeControls 
            mode={mode}
            setMode={changeMode}
            progress={modeAnimProgress}
            stopModeAnim={stopModeAnim}
            totalWorkTime={totalWorkTime}
            totalBreakTime={totalBreakTime}
            displayWorkTime={displayedWorkTime}
            displayBreakTime={displayedBreakTime}
            />
            <TimerControls
            mode={mode}
            progress={resetAnimProgress}
            playing={playing}
            play={play}
            pause={pause}
            reset={reset}
            finishReset={stopResetAnim}
            />
            <LayoutCircle />
        </View>
    );
};

export default TimerScreen;
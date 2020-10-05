import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import BackgroundTimer from 'react-native-background-timer';
import OuterTimer from '../../components/OuterTimer';
import ModeControls from '../../components/ModeControls';
import TimerControls from '../../components/TimerControls';
import LayoutCircle from '../../components/LayoutCircle/LayoutCircle';
import animations from '../../constants/animationEnums';
import timerAnimation from '../../animations/timerAnimation';
import resetAnimation from '../../animations/resetAnimation';
import modeAnimation from '../../animations/modeAnimation';

const {
    Value,
    Clock,
    clockRunning,
    startClock,
    stopClock,
    useCode,
    cond,
    and,
    not,
    set,
    eq,
    interpolate,
} = Animated;

const TimerScreen = () => {

    const [mode, setMode] = useState(1);
    const [totalWorkTime, setTotalWorkTime] = useState(10000);
    const [totalBreakTime, setTotalBreakTime] = useState(5000);
    const [elapsedWorkTime, setElapsedWorkTime] = useState(0);
    const [elapsedBreakTime, setElapsedBreakTime] = useState(0);
    const [displayedWorkTime, setDisplayedWorkTime] = useState(10000);
    const [displayedBreakTime, setDisplayedBreakTime] = useState(5000);
    const [timerTime, setTimerTime] = useState(totalWorkTime);

    const [resetting, setResetting] = useState(0);
    const [activeAnimation, setActiveAnimation] = useState(animations.TIMER);
    const interval = useRef(null);

    const [timerPlaying, setTimerPlaying] = useState(0);
    const [animPlaying, setAnimPlaying] = useState(0);
    const isAnimPlaying = useRef(new Value(0)).current;

    const clock = useRef(new Clock()).current;
    const declaredAnimation = useRef(new Value(animations.NONE)).current;
    const isResetting = useRef(new Value(0)).current;
    const isMode = useRef(new Value(mode)).current;
    const modeAnimProgress = useRef(new Value(0)).current;
    const workCircleAnimProgress = useRef(new Value(0)).current;
    const breakCircleAnimProgress = useRef(new Value(0)).current;
    const timerAnimProgress = useRef(new Value(0)).current;
    
    useEffect(() => {setDisplayedWorkTime(totalWorkTime - elapsedWorkTime)}, [elapsedWorkTime]);

    useEffect(() => {setDisplayedBreakTime(totalBreakTime - elapsedBreakTime)}, [elapsedBreakTime]);

    useEffect(() => {setTimerTime(mode ? displayedWorkTime : displayedBreakTime)}, [displayedWorkTime, displayedBreakTime, mode]);

    useEffect(() => {
        handleInterval();
        return (() => {
            BackgroundTimer.clearInterval(interval.current);
        })
    },[timerPlaying])

    useEffect(() => {
        resetting ? mode ? resetWork() : resetBreak() : null;
    },[resetting])

    useEffect(() => {console.log(mode)}, [mode]);

    useCode(() => set(isMode, mode), [mode]);

    useCode(() => set(isResetting, resetting), [resetting]);

    useCode(() => set(isAnimPlaying, animPlaying), [animPlaying]);
    
    useCode(() => set(declaredAnimation, activeAnimation), [activeAnimation]);

    useCode(() => [
        cond(and(not(clockRunning(clock)), isAnimPlaying), startClock(clock)),
        cond(and(clockRunning(clock), not(isAnimPlaying)), stopClock(clock)),
        cond(eq(declaredAnimation, animations.TIMER), set(timerAnimProgress, runTimerAnimation())),
        cond(eq(declaredAnimation, animations.RESET), set(timerAnimProgress, runResetAnimation())),
        cond(eq(declaredAnimation, animations.MODE), set(timerAnimProgress, runModeAnimation())),
    ],[]);

    const runTimerAnimation = () => {
        return cond(isMode,
                set(workCircleAnimProgress, timerAnimation(clock, totalWorkTime, isResetting, endTimerAnimation, endResetting)),
                set(breakCircleAnimProgress, timerAnimation(clock, totalBreakTime, isResetting, endTimerAnimation, endResetting)));
    }

    const runResetAnimation = () => {
        return interpolate(
                resetAnimation(clock, endResetAnimation),
                {
                    inputRange: [0, 1],
                    outputRange: [cond(isMode, workCircleAnimProgress, breakCircleAnimProgress), 0]
                });
    } 

    const runModeAnimation = () => {
        return interpolate(
                set(modeAnimProgress, modeAnimation(clock, endModeAnimation)),
                {
                    inputRange: [0, 1],
                    outputRange: [workCircleAnimProgress, breakCircleAnimProgress]
                });
    }

    const endTimerAnimation = () => {
        pauseTimer();
    }

    const endResetAnimation = () => {
        setResetting(1);
        setAnimPlaying(0);
        setActiveAnimation(animations.TIMER);
    }

    const endResetting = () => {
        setResetting(0);
        resetTimer();
    }

    const endModeAnimation = () => {
        setAnimPlaying(0);
        setActiveAnimation(animations.TIMER);
    }

    const handleInterval = () => {
        interval.current = getInterval();
        if(!timerPlaying) {
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

    const startTimer = () => {
        if(activeAnimation == animations.TIMER){
            setAnimPlaying(1);
            setTimerPlaying(1);
        }
    }

    const pauseTimer = () => {
        setTimerPlaying(0);
        setAnimPlaying(0);
    }

    const resetTimer = () => {
        pauseTimer();
        if(mode ? elapsedWorkTime : elapsedBreakTime && activeAnimation == animations.TIMER){
            setActiveAnimation(animations.RESET);
            setAnimPlaying(1);
        }
    }
   
    const changeMode = (id) => {
        if(id != mode && activeAnimation == animations.TIMER){
            pauseTimer();
            setMode(id);
            setActiveAnimation(animations.MODE);
            setAnimPlaying(1);
        }
    }

    const resetTime = () => {
        mode ? resetWork() : resetBreak();
    }

    const resetWork = () => {
        setElapsedWorkTime(0);
        setDisplayedWorkTime(totalWorkTime);
    }

    const resetBreak = () => {
        setElapsedBreakTime(0);
        setDisplayedBreakTime(totalBreakTime);
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
            changeMode={changeMode}
            progress={modeAnimProgress}
            totalWorkTime={totalWorkTime}
            totalBreakTime={totalBreakTime}
            displayWorkTime={displayedWorkTime}
            displayBreakTime={displayedBreakTime}
            />
            <TimerControls
            mode={mode}
            timerPlaying={timerPlaying}
            play={startTimer}
            pause={pauseTimer}
            reset={resetTimer}
            />
            <LayoutCircle />
        </View>
    );
};

export default TimerScreen;
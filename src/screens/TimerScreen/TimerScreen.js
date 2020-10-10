import React, { useEffect, useRef, useState } from 'react';
import {View, useWindowDimensions, AppState} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';
import PushNotification from 'react-native-push-notification';
import OuterTimer from '../../components/timerComponents/OuterTimer';
import ModeControls from '../../components/timerComponents/ModeControls';
import TimerControls from '../../components/timerComponents/TimerControls';
import animations from '../../constants/animationEnums';
import nav from '../../constants/navDimensions';
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


PushNotification.createChannel(
    {
      channelId: "workaholic",
      channelName: "Timer Channe;",
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

const TimerScreen = ({mode, setMode, totalWorkTime, totalBreakTime, activeScreen}) => {

    const interval = useRef(null);
    const alarm = useRef(null);

    const [elapsedWorkTime, setElapsedWorkTime] = useState(0);
    const [elapsedBreakTime, setElapsedBreakTime] = useState(0);
    const [displayedWorkTime, setDisplayedWorkTime] = useState(0);
    const [displayedBreakTime, setDisplayedBreakTime] = useState(0);
    const [timerTime, setTimerTime] = useState(0);
    const [activeAnimation, setActiveAnimation] = useState(animations.TIMER);
    const [resetting, setResetting] = useState(0);
    const [timerPlaying, setTimerPlaying] = useState(0);
    const [animPlaying, setAnimPlaying] = useState(0);
    const [timerStopped, setTimerStopped] = useState(0);

    const isAnimPlaying = useRef(new Value(0)).current;
    const clock = useRef(new Clock()).current;
    const declaredAnimation = useRef(new Value(animations.NONE)).current;
    const isResetting = useRef(new Value(0)).current;
    const isMode = useRef(new Value(mode)).current;
    const animationDuration = useRef(new Value(0)).current;
    const modeAnimProgress = useRef(new Value(0)).current;
    const workCircleAnimProgress = useRef(new Value(0)).current;
    const breakCircleAnimProgress = useRef(new Value(0)).current;
    const timerAnimProgress = useRef(new Value(0)).current;

    useEffect(() => {
        configureAlarm();
        configureNotification();
        return (() => {alarm.current.release()})
    },[])

    useEffect(() => {
        resetWork();
        setResetting(1);
    },[totalWorkTime])

    useEffect(() => {
        resetBreak();
        setResetting(1);
    },[totalBreakTime])

    useEffect(() => {
        setDisplayedWorkTime(totalWorkTime - elapsedWorkTime);
        checkIfTimerEnded();    
    }, [elapsedWorkTime]);

    useEffect(() => {
        setDisplayedBreakTime(totalBreakTime - elapsedBreakTime);
        checkIfTimerEnded();
    }, [elapsedBreakTime]);

    useEffect(() => {setTimerTime(mode ? displayedWorkTime : displayedBreakTime)}, [displayedWorkTime, displayedBreakTime, mode]);

    useEffect(() => {
        handleInterval();
        return (() => {
            BackgroundTimer.clearInterval(interval.current);
        })
    },[timerPlaying])

    useEffect(() => {
        resetting ? mode ? resetWork() : resetBreak() : handleTimerStopped();
    },[resetting])

    useEffect(() => {
        changeMode(mode);
    },[mode])

    useCode(() => set(isMode, mode), [mode]);

    useCode(() => set(isResetting, resetting), [resetting]);

    useCode(() => set(isAnimPlaying, animPlaying), [animPlaying]);
    
    useCode(() => set(declaredAnimation, activeAnimation), [activeAnimation]);

    useCode(() => set(animationDuration, cond(isMode, totalWorkTime, totalBreakTime)), [totalWorkTime, totalBreakTime, isMode]);

    useCode(() => [
        cond(and(not(clockRunning(clock)), isAnimPlaying), startClock(clock)),
        cond(and(clockRunning(clock), not(isAnimPlaying)), stopClock(clock)),
        cond(eq(declaredAnimation, animations.TIMER), set(timerAnimProgress, runTimerAnimation())),
        cond(eq(declaredAnimation, animations.RESET), set(timerAnimProgress, runResetAnimation())),
        cond(eq(declaredAnimation, animations.MODE), set(timerAnimProgress, runModeAnimation())),
    ],[]);

    const runTimerAnimation = () => {
        return cond(isMode,
                set(workCircleAnimProgress, timerAnimation(clock, animationDuration, isResetting, endTimerAnimation, endResetting)),
                set(breakCircleAnimProgress, timerAnimation(clock, animationDuration, isResetting, endTimerAnimation, endResetting)));
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
                set(modeAnimProgress, modeAnimation(clock, isMode, endModeAnimation)),
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
    }

    const endModeAnimation = () => {
        setAnimPlaying(0);
        setActiveAnimation(animations.TIMER);
    }

    const configureAlarm = () => {
        alarm.current = new Sound ('cool_alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
            if(error) {
                console.log("Error loading alarm: ", error);
                return;
            }
            alarm.current.setNumberOfLoops(-1);
        })
        Sound.setCategory('Playback');
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

    const checkIfTimerEnded = () => {
        mode ? checkIfWorkTimerEnded() : checkIfBreakTimerEnded();
    }

    const checkIfWorkTimerEnded = () => {
        if(totalWorkTime - elapsedWorkTime <= 100) {
            handleTimerEnd();
        }
    }

    const checkIfBreakTimerEnded = () => {
        if(totalBreakTime - elapsedBreakTime <= 100) {
            handleTimerEnd();
        }
    }

    const updateTimes = (time) => {
        mode ? setElapsedWorkTime(elapsedWorkTime + time) : setElapsedBreakTime(elapsedBreakTime + time);
    }

    const handleTimerEnd = () => {
        pauseTimer();     
        sendNotification();       
        setTimerStopped(1);
        playAlarm();
    }

    const configureNotification = () => {
        PushNotification.configure({
            onNotification: function (notification) {
                stopTimer();
                notification.finish();
            },
        
            onAction: function (notification) {;
                if(notification.action === 'DISMISS') {
                    stopAlarm();
                }
            },
            
            requestPermissions: Platform.OS === 'ios'
        })
    }

    const sendNotification = () => {

        const title = mode ? "Take a break!" : "Back to work.";

        const modeMessage = mode ? "Work " : "Break ";

        const now = new Date(Date.now());

        const message = modeMessage + `finished at ${now.getHours()}:${now.getMinutes()}`; 
        
        PushNotification.localNotification({
            channelId: 'workaholic',
            title,
            message,
            invokeApp: false,
            actions: ["DISMISS"],
            ignoreInForeground: true,
            largeIcon: 'timer_icon_round',
            smallIcon: 'timer_icon_round',
            data: {dismiss: stopAlarm()},        
        })
    }

    const handleTimerStopped = () => {
        if(timerStopped){
            setTimerStopped(0);
            changeMode(!mode);
        }
    }

    const stopTimer = () => {
        stopAlarm();
        resetTimer();
    }

    const startTimer = () => {
        if(activeAnimation == animations.TIMER){
            setAnimPlaying(1);
            setTimerPlaying(1);
        }
    }

    const pauseTimer = () => {
        if(activeAnimation === animations.TIMER){
            setTimerPlaying(0);
            setAnimPlaying(0);
        }
    }

    const resetTimer = () => {
        pauseTimer();
        if(mode ? elapsedWorkTime : elapsedBreakTime && activeAnimation == animations.TIMER){
            setActiveAnimation(animations.RESET);
            setAnimPlaying(1);
        }
    }
   
    const changeMode = (id) => {
        if(activeAnimation == animations.TIMER){
            setMode(id)
            enableModeAnimation();
        }
    }

    const enableModeAnimation = () => {
        if(activeAnimation == animations.TIMER){
            pauseTimer();
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

    const playAlarm = () => {
        alarm.current.play();
    }

    const stopAlarm = () => {
        alarm.current.stop();
    }

    return (
        <View style={{height: useWindowDimensions().height - nav.NAV_HEIGHT, alignItems: 'center', width: useWindowDimensions().width}}>
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
            timerStopped={timerStopped}
            play={startTimer}
            pause={pauseTimer}
            reset={resetTimer}
            stop={stopTimer}
            />
        </View>
    );
};

export default TimerScreen;
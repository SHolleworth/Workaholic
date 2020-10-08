import React, { useState, useEffect } from 'react';
import {View, useWindowDimensions} from 'react-native';
import Intervals from '../../components/timerSettingsComponents/Intervals';
import Keypad from '../../components/timerSettingsComponents/Keypad';
import nav from '../../constants/navDimensions';

const TimerSettingsScreen = ({mode, setMode, setTotalBreakTime, setTotalWorkTime, transitionScreen}) => {
    const height = useWindowDimensions().height - nav.NAV_HEIGHT * 2;
    
    const [activeInterval, setActiveInterval] = useState(3);
    const [hasMounted, setHasMounted] = useState(false);
    const BREAK_HOURS = 0;
    const BREAK_MINUTES = 1;
    const BREAK_SECONDS = 2;
    const WORK_HOURS = 3;
    const WORK_MINUTES = 4;
    const WORK_SECONDS = 5;
    const [intervals, setIntervals] = useState([[0,0],[0,5],[0,0], [0,0],[2,5],[0,0]]);
    const [newValue, setNewValue] = useState(0);
    const [intervalsAreSet , setIntervalsAreSet] = useState(false);

    useEffect(() => {
        confirm();
    },[intervals])

    //receives signal fromkeypad and sends value to IntervalSetter
    const sendNumber = (value) => {
        if(value === -5){
            transitionScreen(0);
        }
        else{
            setNewValue(value);
        }
    }

    //receives signal from IntervalSetter after a value change
    const updateTime = (id, value)=> {
        let temp = intervals.slice();
        temp[id] = value;
        setIntervals(temp);
    }

    const confirm = () => {
        const breakHours = intervals[BREAK_HOURS][0] * 10 + intervals[BREAK_HOURS][1];
        const breakMinutes = intervals[BREAK_MINUTES][0] * 10 + intervals[BREAK_MINUTES][1];
        const breakSeconds = intervals[BREAK_SECONDS][0] * 10 + intervals[BREAK_SECONDS][1];

        const workHours = intervals[WORK_HOURS][0] * 10 + intervals[WORK_HOURS][1];
        const workMinutes = intervals[WORK_MINUTES][0] * 10 + intervals[WORK_MINUTES][1];
        const workSeconds = intervals[WORK_SECONDS][0] * 10 + intervals[WORK_SECONDS][1];

        const breakMillis = convertToMillis(breakSeconds, breakMinutes, breakHours);
        const workMillis = convertToMillis(workSeconds, workMinutes, workHours);
        setTotalBreakTime(breakMillis);
        setTotalWorkTime(workMillis);
    }

    const convertToMillis = (s, m , h) => {
        return hoursToMilliseconds(h) + minutesToMilliseconds(m) + secondsToMilliseconds(s);
    }

    const hoursToMilliseconds = (val) => {
        return val * 60 * 60 * 1000;
    }

    const minutesToMilliseconds = (val) => {
        return val * 60 * 1000;
    }

    const secondsToMilliseconds = (val) => {
        return val * 1000;
    }

    return (
        <View style={{height, width: useWindowDimensions().width, justifyContent: 'center', alignItems: 'center'}}>
            <Intervals
                activeInterval={activeInterval}
                setActiveInterval={setActiveInterval}
                newValue={newValue}
                setMode={setMode}
                sendNumber={sendNumber}
                updateTime={updateTime}/>
            <Keypad
                mode={mode}
                sendNumber={sendNumber}
                intervalsAreSet={intervalsAreSet}/>
        </View>
    );
};

export default TimerSettingsScreen;
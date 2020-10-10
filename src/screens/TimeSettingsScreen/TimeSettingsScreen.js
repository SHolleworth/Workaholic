import React, { useState, useEffect } from 'react';
import {View, useWindowDimensions} from 'react-native';
import Intervals from '../../components/timerSettingsComponents/Intervals';
import Keypad from '../../components/timerSettingsComponents/Keypad';
import nav from '../../constants/navDimensions';
import convertTime from '../../constants/convertTime';

const TimerSettingsScreen = ({
        mode,
        setMode, 
        totalWorkTime, 
        totalBreakTime, 
        setTotalBreakTime, 
        setTotalWorkTime, 
        transitionScreen
    }) => {
    const height = useWindowDimensions().height - nav.NAV_HEIGHT * 2;
    
    const [activeInterval, setActiveInterval] = useState(4);
    const BREAK = 0;
    const WORK = 1;
    const HOURS = 0;
    const MINUTES = 1;
    const SECONDS = 2
    const [intervals, setIntervals] = useState([[[0,0],[0,0],[0,0]], [[0,0],[0,0],[0,0]]]);
    const [newValue, setNewValue] = useState(0);

    useEffect(() => {
        loadInitalValues();
    },[totalWorkTime, totalBreakTime])

    useEffect(() => {
        if(mode) {
            if (activeInterval !== 3 && activeInterval !== 4 && activeInterval !== 5) {
                setActiveInterval(4)
            }
         }
        else {
            if (activeInterval !== 0 && activeInterval !== 1 && activeInterval !== 2) {
                setActiveInterval(1)
            }
        }
    },[mode])
    
    const loadInitalValues = () => {
        if(totalWorkTime && totalBreakTime){
            let time = convertTime(totalWorkTime);
            let hours = [Math.floor(time.hours/10), time.hours % 10];
            let minutes = [Math.floor(time.minutes/10), time.minutes % 10];
            let seconds = [Math.floor(time.seconds/10), time.seconds % 10];
            const workValues = [hours, minutes, seconds];
            time = convertTime(totalBreakTime);
            hours = [Math.floor(time.hours/10), time.hours % 10];
            minutes = [Math.floor(time.minutes/10), time.minutes % 10];
            seconds = [Math.floor(time.seconds/10), time.seconds % 10];
            const breakValues = [hours, minutes, seconds];
            setIntervals([breakValues, workValues]);
        }
    }

    //receives signal fromkeypad and sends value to IntervalSetter
    const sendNumber = (value) => {
        if(value === -5){
            confirm();
        }
        else{
            setNewValue(value);
        }
    }

    //receives signal from IntervalSetter after a value change
    const updateTime = (id, value)=> {
        const idMode = Math.floor(id/3);
        const idInterval = id%3;
        let temp = intervals.slice();
        temp[idMode][idInterval] = value;
        setIntervals(temp);
    }

    const confirm = () => {
        if(activeInterval > 2){
            setMode(1);
        }
        else {
            setMode(0);
        }
        const breakHours = intervals[BREAK][HOURS][0] * 10 + intervals[BREAK][HOURS][1];
        const breakMinutes = intervals[BREAK][MINUTES][0] * 10 + intervals[BREAK][MINUTES][1];
        const breakSeconds = intervals[BREAK][SECONDS][0] * 10 + intervals[BREAK][SECONDS][1];

        const workHours = intervals[WORK][HOURS][0] * 10 + intervals[WORK][HOURS][1];
        const workMinutes = intervals[WORK][MINUTES][0] * 10 + intervals[WORK][MINUTES][1];
        const workSeconds = intervals[WORK][SECONDS][0] * 10 + intervals[WORK][SECONDS][1];

        const breakMillis = convertToMillis(breakSeconds, breakMinutes, breakHours);
        const workMillis = convertToMillis(workSeconds, workMinutes, workHours);
        setTotalBreakTime(breakMillis);
        setTotalWorkTime(workMillis);
        transitionScreen(0);
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
                totalWorkTime={totalWorkTime}
                totalBreakTime={totalBreakTime}
                activeInterval={activeInterval}
                setActiveInterval={setActiveInterval}
                newValue={newValue}
                sendNumber={sendNumber}
                updateTime={updateTime}/>
            <Keypad
                mode={mode}
                sendNumber={sendNumber}
                />
        </View>
    );
};

export default TimerSettingsScreen;
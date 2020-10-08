import React, { useEffect, useState } from 'react';
import {View, Text, TouchableWithoutFeedback, TouchableHighlight} from 'react-native';
import styles from './styles'
import colors from '../../../constants/colors';

const ModeSelectTouchable = ({mode, id, changeMode, totalTime, activeTime}) => {

    const [totalHours, setTotalHours] = useState("0");
    const [totalMins, setTotalMins] = useState("0");
    const [totalSecs, setTotalSecs] = useState("0");
    const [totalMils, setTotalMils] = useState("0");

    const [currentHours, setCurrentHours] = useState("0");
    const [currentMins, setCurrentMins] = useState("0");
    const [currentSecs, setCurrentSecs] = useState("0");
    const [currentMils, setCurrentMils] = useState("0");

    useEffect(() => {
        updateTotalTime();
    },[totalTime])

    useEffect(() => {
        updateCurrentTime(activeTime);
    },[activeTime])

    const updateTotalTime = () => {
        const time = convertTime(totalTime);
        setTotalHours(time.hours > 9 ? time.hours : "0" + time.hours);
        setTotalMins(time.minutes > 9 ? time.minutes : "0" + time.minutes);
        setTotalSecs(time.seconds > 9 ? time.seconds : "0" + time.seconds);
        setTotalMils(time.milliseconds > 9 ? time.milliseconds : "0" + time.milliseconds);
        updateCurrentTime(totalTime);
    }

    const updateCurrentTime = (newTime) => {
        const time = convertTime(newTime);
        setCurrentHours(time.hours > 9 ? time.hours : "0" + time.hours);
        setCurrentMins(time.minutes > 9 ? time.minutes : "0" + time.minutes);
        setCurrentSecs(time.seconds > 9 ? time.seconds : "0" + time.seconds);
        setCurrentMils(time.milliseconds > 9 ? time.milliseconds : "0" + time.milliseconds);
    }

    const handlePress = () => {
        changeMode(id);
    }

    return (
        <TouchableHighlight 
        style={styles.container}
        disabled={mode === id ? true : false}
        underlayColor={colors.PRIMARY}
        onPress={handlePress}
        >
            <View style={styles.container}>
                <Text style={styles.title}>{id ? "work time" : "break time"}</Text>
                <Text style={styles.currentTime}>{`${currentHours}:${currentMins}:${currentSecs}`}</Text>
                <Text style={styles.totalTime}>{`${totalHours}:${totalMins}:${totalSecs}`}</Text>
            </View>
        </TouchableHighlight>
    );
};

const convertTime = milliseconds => {
    let time = {};
    let remainingMillis = milliseconds;
    time.hours = setToZero(Math.floor(remainingMillis / (1000 * 60 * 60)));
    remainingMillis = remainingMillis % (1000 * 60 * 60);
    time.minutes = setToZero(Math.floor(remainingMillis / (1000 * 60)));
    remainingMillis = remainingMillis % (1000 * 60);
    time.seconds = setToZero(Math.floor(remainingMillis / (1000)));
    remainingMillis = remainingMillis % 1000;
    time.milliseconds = setToZero(remainingMillis);

    return time;
}

const setToZero = (value) => {
    if(value < 0){
      return 0;
    }
    return value;
  }

export default ModeSelectTouchable;
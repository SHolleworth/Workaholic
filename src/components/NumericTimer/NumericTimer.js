import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const HOURS = 0;
const MINS = 1;
const SECONDS = 2;
const MILLIS = 3;

const NumericTimer = (props) => {

  const [hours, setHour] = useState("0");
  const [mins, setMin] = useState("0");
  const [secs, setSec] = useState("0");
  const [mils, setMil] = useState("0");

  const width = props.radius * 1.7;
  const height = props.radius * 0.45;
  const pos = {
    top : props.radius - height/2,
    left : props.radius - width/2,
    borderRadius : height/2,
  }
  const fontSize = props.radius/2.8;

  useEffect(() => {
    const time =  convertTime(props.interval);
    setHour(time.hours > 9 ? time.hours : "0" + time.hours);
    setMin(time.minutes > 9 ? time.minutes : "0" + time.minutes);
    setSec(time.seconds > 9 ? time.seconds : "0" + time.seconds);
    setMil(time.milliseconds > 9 ? time.milliseconds : "0" + time.milliseconds);
  }, [props.interval])

  return (
    <View style={[styles.container, {height:height, width:width, ...pos}]}>
      <Text style={[styles.text, {fontSize: fontSize}]}>{`${hours}:${mins}:${secs}`}</Text>
    </View>
  );
}

const convertTime = milliseconds => {
    let remainingMillis = milliseconds;
    const newHours = setToZero(Math.floor(remainingMillis / (1000 * 60 * 60)));
    remainingMillis = remainingMillis % (1000 * 60 * 60);
    const newMinutes = setToZero(Math.floor(remainingMillis / (1000 * 60)));
    remainingMillis = remainingMillis % (1000 * 60);
    const newSeconds = setToZero(Math.floor(remainingMillis / (1000)));
    remainingMillis = remainingMillis % 1000;
    const newMilliseconds = setToZero(remainingMillis);

    return {
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds,
      milliseconds: newMilliseconds,
    };
}

const setToZero = (value) => {
  if(value < 0){
    return 0;
  }
  return value;
}

export default NumericTimer;

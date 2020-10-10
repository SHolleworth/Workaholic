import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, useWindowDimensions} from 'react-native';
import colors from '../../../constants/colors'
import styles from './styles';
import SingleInterval from '../SingleInterval';
import convertTime from '../../../constants/convertTime';

const workPrimary = colors.WORK_HIGHLIGHT;
const breakPrimary = colors.BREAK_HIGHLIGHT;

const IntervalSetter = ({totalTime, ...props}) => {

  const delta = props.mode * 3;
  const [initialValues, setInitialValues] = useState([[0,0],[0,0],[0,0]]);

  useEffect(() => {
    loadInitalValues();
  },[])

  const loadInitalValues = () => {
    if(totalTime){
      const time = convertTime(totalTime);
      const hours = [Math.floor(time.hours/10), time.hours % 10];
      const minutes = [Math.floor(time.minutes/10), time.minutes % 10]
      const seconds = [Math.floor(time.seconds/10), time.seconds % 10]
      const newValues = [hours, minutes, seconds];
      setInitialValues(newValues);
    }
  }

  return (
    <View style={{flexDirection:'row'}}>
      {initialValues.map((value, i) =>
        <View style={{flexDirection: 'row'}} key={i}>
          <SingleInterval
            mode={props.mode}
            id={i+delta}
            key={i+delta}
            setActiveInterval={props.setActiveInterval}
            active={props.active}
            initialValue={value}
            newValue={props.newValue}
            sendNumber={props.sendNumber}
            updateTime={props.updateTime}/>
          {i < 2 ? <Text style={[styles.text, {marginRight: -15, marginLeft: -7}]}>:</Text> : null }
        </View>
      )}
    </View>
  );
}

export default IntervalSetter;

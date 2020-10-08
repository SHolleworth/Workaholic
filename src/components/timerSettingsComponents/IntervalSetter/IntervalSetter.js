import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Text, useWindowDimensions} from 'react-native';
import colors from '../../../constants/colors'
import styles from './styles';
import SingleInterval from '../SingleInterval';

const workPrimary = colors.WORK_HIGHLIGHT;
const breakPrimary = colors.BREAK_HIGHLIGHT;

const IntervalSetter = (props) => {

  const delta = props.mode * 3;

  const workMinutes = [2,5];
  const breakMinutes = [0,5];

  return (
    <View style={{flexDirection:'row'}}>
      {[0,1,2].map((e, i) =>
        <View style={{flexDirection: 'row'}} key={i}>
          <SingleInterval
            mode={props.mode}
            setMode={props.setMode}
            id={e+delta}
            key={i+delta}
            setActiveInterval={props.setActiveInterval}
            active={props.active}
            initialValue={e+delta == 1 ? breakMinutes : e+delta == 4 ? workMinutes : [0,0]}
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

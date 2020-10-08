import React from 'react';
import {View, Text} from 'react-native';
import IntervalSetter from '../IntervalSetter';
import styles from './styles';

const Intervals = (props) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={ styles.timerHeaderText }>work time</Text>
      <IntervalSetter 
        mode={1}
        setMode={props.setMode}
        setActiveInterval={props.setActiveInterval}
        active={props.activeInterval}
        newValue={props.newValue}
        sendNumber={props.sendNumber}
        updateTime={props.updateTime}
        />
      <Text style={[ styles.timerHeaderText, {marginTop: 10} ]}>break time</Text>
      <IntervalSetter
         mode={0}
         setMode={props.setMode}
         setActiveInterval={props.setActiveInterval}
         active={props.activeInterval}
         newValue={props.newValue}
         sendNumber={props.sendNumber}
         updateTime={props.updateTime}
         />
    </View>
  );
}

export default Intervals;

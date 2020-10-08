import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import colors from '../../../constants/colors';
import styles from './styles';

const SingleInterval = (props) => {
  const [value, setValue] = useState(props.initialValue);

  useEffect(() => {
    props.updateTime(props.id, value);
  }, value)

  useEffect(() => {
    if(isActive()){
      if(props.newValue != -1) {
        updateDisplay();
        props.sendNumber(-1);
      }
    }
  },[props.newValue])

  const handlePress = () => {
    props.setMode(props.mode);
    props.setActiveInterval(props.id);
  }

  const isActive = () => {
    if(props.id == props.active) return true;
    return false;
  }

  const updateDisplay = () => {
    if(props.newValue == -2) {
      setValue([0, value[0]])
    }
    else if(value[1] == 0 && value[0] == 0) {
      setValue([0, props.newValue]);
    }
    else if(value[0] == 0 && value[1] != 0){
      setValue([value[1], props.newValue]);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <Text style={[styles.text,
      { color:
          props.mode ?
          isActive() ? colors.WORK_HIGHLIGHT : 'white'
          :
          isActive() ? colors.BREAK_HIGHLIGHT : 'white'
      }]}
      > { value.map(e => e) } </Text>
    </TouchableWithoutFeedback>
  );
}

export default SingleInterval;
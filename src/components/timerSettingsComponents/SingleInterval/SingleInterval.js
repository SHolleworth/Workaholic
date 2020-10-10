import React, {useState, useEffect} from 'react';
import {View, Text, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import colors from '../../../constants/colors';
import styles from './styles';

const SingleInterval = (props) => {
  const [value, setValue] = useState(props.initialValue);

  useEffect(() => {
    setValue(props.initialValue);
    props.updateTime(props.id, value);
  },[props.initialValue])

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

  const fontSize = useWindowDimensions().width / 5

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <Text style={[styles.text,
      { color:
          props.id > 2 ?
          isActive() ? colors.WORK_HIGHLIGHT : 'white'
          :
          isActive() ? colors.BREAK_HIGHLIGHT : 'white',
          fontSize,
      }]}
      > { value.map(e => e) } </Text>
    </TouchableWithoutFeedback>
  );
}

export default SingleInterval;

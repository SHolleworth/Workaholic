import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import colors from '../../../constants/colors';
import styles from './styles';

const NumericKey = (props) => {
  const [pressed, setPressed] = useState(false);
  const tickIcon = require('../../../assets/images/tick.png');

  const handlePress = () => {
    props.sendNumber(props.value);
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {setPressed(true)}}
      onPressOut={() => {setPressed(false)}}
      onPress={handlePress}>
      <View style={[styles.button , { backgroundColor: 
        pressed ? 
        props.mode ? 
          colors.WORK_HIGHLIGHT
          :
          colors.BREAK_HIGHLIGHT
        : 
        'transparent' }]}>
          {props.value === -5 ?
          <Image style={styles.image} source={tickIcon} />
           : 
          <Text style={styles.text}>{props.value !== -2 ? props.value : "X"}</Text>}
        </View>
    </TouchableWithoutFeedback>
  );
}

export default NumericKey;

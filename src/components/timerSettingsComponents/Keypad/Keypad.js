import React from 'react';
import {View} from 'react-native';
import NumericKey from '../NumericKey/index';

const Keypad = (props) => {

  const DELETE = -2;
  const CONFIRM = -5;

  const sendNumber = (num) => {
    props.sendNumber(num);
  }

  return (
    <View style={
      {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
        width: 300,
        marginTop: 20}}>
      {[1,2,3,4,5,6,7,8,9,CONFIRM,0,DELETE].map( (e, i) =>
        <NumericKey 
        mode={props.mode} value={e} key={i} sendNumber={sendNumber}/>
      )}

    </View>
  );
}

export default Keypad;

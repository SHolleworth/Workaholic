import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors'

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Lato-Light',
    color: 'white',
  },
});

export default styles;

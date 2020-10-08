import React from 'react';
import {Dimensions, View} from 'react-native';
import ScreenContainer from './src/containers/ScreenContainer';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ScreenContainer />
    </View>
  );
};

export default App;
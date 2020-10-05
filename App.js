import React from 'react';
import {View} from 'react-native';
import ScreenContainer from './src/containers/ScreenContainer';

const App = () => {
  return (
    <View style={{flex:1, backgroundColor: 'red'}}>
      <ScreenContainer />
    </View>
  );
};

export default App;
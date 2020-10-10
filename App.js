import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenContainer from './src/containers/ScreenContainer';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [loaded, setLoaded] = useState(0);
  const [showSplash, setShowSplash] = useState(1);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  useEffect(() => {
    loadTotals();
  },[])

  useEffect(() => {
    saveTotals();
  },[totalWorkTime, totalBreakTime])

  useEffect(() => {
    loaded ? waitOnSplashScreen() : null; 
  },[loaded])

  const waitOnSplashScreen = () => {
    setShowSplash(1);
    setTimeout(() => {
      setShowSplash(0);
    },1000)
  }
 
  const saveTotals = async () => {
    try {
      const jsonTotals = JSON.stringify({work: totalWorkTime, break :totalBreakTime});
      await AsyncStorage.setItem('@totals', jsonTotals);
    }
    catch(e) {
      console.log("Error saving totals: " + e);
    }
  }

  const loadTotals = async () => {
    try {
      const jsonTotals = await AsyncStorage.getItem('@totals');
      if(jsonTotals){
        const totals = JSON.parse(jsonTotals);
        setTotalWorkTime(totals.work);
        setTotalBreakTime(totals.break);
      }
      else {
        setTotalWorkTime(25 * 60000);
        setTotalBreakTime(5 * 60000);
      }
      setLoaded(1);
    }
    catch (e) {
      console.log("Error loading totals: " + e);
    }
  }

  if(loaded) {
      return (
      <View style={{flex: 1}}>
        <ScreenContainer 
        totalWorkTime={totalWorkTime}
        totalBreakTime={totalBreakTime}
        setTotalWorkTime={setTotalWorkTime}
        setTotalBreakTime={setTotalBreakTime}
        saveTotals={saveTotals}
        />
        {showSplash ? <SplashScreen /> : null}
      </View>
    );
  }
  else {
    return <SplashScreen />;
  }
};

export default App;
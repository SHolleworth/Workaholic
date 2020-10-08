import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PlayPauseStopButton from '../PlayPauseStopButton';
import ResetButton from '../ResetButton';

const TimerControls = ({mode, timerPlaying, timerStopped, play, pause, reset, stop}) => {
    return (
        <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
            <PlayPauseStopButton
            mode={mode}
            timerPlaying={timerPlaying}
            timerStopped={timerStopped}
            play={play}
            pause={pause}
            stop={stop}
            />
            <ResetButton reset={reset} />
        </View>
    );
};

export default TimerControls;
import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PlayPauseStopButton from '../PlayPauseStopButton';
import ResetButton from '../ResetButton';

const TimerControls = ({mode, timerPlaying, play, pause, reset}) => {
    return (
        <View style={{marginTop: 20, alignItems: 'center'}}>
            <PlayPauseStopButton
            mode={mode}
            timerPlaying={timerPlaying}
            play={play}
            pause={pause}
            />
            <ResetButton reset={reset} />
        </View>
    );
};

export default TimerControls;
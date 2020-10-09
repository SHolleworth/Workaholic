import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import ModeSelectHighlight from '../ModeSelectHighlight';
import ModeSelectTouchable from '../ModeSelectTouchable';
import styles from './styles'

const ModeControls = ({mode, changeMode, progress, totalWorkTime, totalBreakTime, displayWorkTime, displayBreakTime}) => {

    return (
        <View style={[styles.container]}>
            <ModeSelectHighlight mode={mode} progress={progress}/>
            <ModeSelectTouchable 
            id={1}
            mode={mode}
            changeMode={changeMode}
            activeTime={displayWorkTime}
            totalTime={totalWorkTime}
            />
            <ModeSelectTouchable
            id={0}
            mode={mode}
            changeMode={changeMode}
            activeTime={displayBreakTime}
            totalTime={totalBreakTime}
            />
        </View>
    );
};

export default ModeControls;
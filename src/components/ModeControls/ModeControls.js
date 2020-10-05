import React from 'react';
import {View} from 'react-native';
import ModeSelectHighlight from '../../components/ModeSelectHighlight';
import ModeSelectTouchable from '../../components/ModeSelectTouchcble';
import styles from './styles'

const ModeControls = ({mode, changeMode, progress, totalWorkTime, totalBreakTime, displayWorkTime, displayBreakTime}) => {

    return (
        <View style={styles.container}>
            <ModeSelectHighlight mode={mode} progress={progress}/>
            <ModeSelectTouchable 
            id={1}
            changeMode={changeMode}
            activeTime={displayWorkTime}
            totalTime={totalWorkTime}
            />
            <ModeSelectTouchable
            id={0}
            changeMode={changeMode}
            activeTime={displayBreakTime}
            totalTime={totalBreakTime}
            />
        </View>
    );
};

export default ModeControls;
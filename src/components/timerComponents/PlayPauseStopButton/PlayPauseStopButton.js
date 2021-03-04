import React, { useEffect, useReducer, useState } from 'react';
import {TouchableOpacity, View, Image, useWindowDimensions} from 'react-native';
import styles from './styles'
import colors from '../../../constants/colors';

const PlayPauseStopButton = ({mode, timerPlaying, timerStopped, play, pause, stop}) => {

    const pauseIcon = require('../../../assets/images/pause.png');
    const playIcon = require('../../../assets/images/play.png');
    const stopIcon = require('../../../assets/images/stop.png');
    const [icon, setIcon] = useState(playIcon);

    const handlePress = () => {
        timerStopped ?
            stop()
        :
            timerPlaying ?
                pause()
            :
                play();
    }

    useEffect(() => {
        timerStopped ?
            setIcon(stopIcon)
        :
            timerPlaying ?
                setIcon(pauseIcon)
            :
                setIcon(playIcon);
    },[timerPlaying, timerStopped])

    const height = useWindowDimensions().height / 8;

    return (
        <TouchableOpacity onPress={handlePress} touchSoundDisabled={false}>
            <View style={[styles.button, {height, width: height, borderRadius: height / 2 , backgroundColor: colors.BACKGROUND, borderColor: mode ? colors.WORK_HIGHLIGHT : colors.BREAK_HIGHLIGHT}]}>
                <Image style={styles.image} source={icon}/>
            </View>
        </TouchableOpacity>
    );
};

export default PlayPauseStopButton;
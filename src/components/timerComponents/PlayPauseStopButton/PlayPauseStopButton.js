import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Image, useWindowDimensions} from 'react-native';
import styles from './styles'
import colors from '../../../constants/colors';

const PlayPauseStopButton = ({mode, timerPlaying, timerStopped, play, pause, stop}) => {

    const pauseIcon = '../../../assets/images/pause.png';
    const playIcon = '../../../assets/images/play.png';
    const stopIcon = '../../../assets/images/stop.png';
    const [icon, setIcon] = useState(require(playIcon));

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
            setIcon(require(stopIcon))
        :
            timerPlaying ?
                setIcon(require(pauseIcon))
            :
                setIcon(require(playIcon));
    },[timerPlaying, timerStopped])

    const height = useWindowDimensions().height / 8;

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.button, {height, width: height, borderRadius: height / 2 , backgroundColor: colors.BACKGROUND, borderColor: mode ? colors.WORK_HIGHLIGHT : colors.BREAK_HIGHLIGHT}]}>
                <Image style={styles.image} source={icon}/>
            </View>
        </TouchableOpacity>
    );
};

export default PlayPauseStopButton;
import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import styles from './styles'
import colors from '../../constants/colors';

const PlayPauseStopButton = ({mode, timerPlaying, play, pause}) => {

    const pauseIcon = '../../assets/images/pause.png';
    const playIcon = '../../assets/images/play.png';
    const stopIcon = '../../assets/images/stop.png';
    const [icon, setIcon] = useState(require(playIcon));

    const handlePress = () => {
        timerPlaying ?
            pause()
        :
            play();
    }

    useEffect(() => {
        timerPlaying ?
            setIcon(require(pauseIcon))
        :
            setIcon(require(playIcon));
    },[timerPlaying])

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.button, {backgroundColor: mode ? colors.WORK_HIGHLIGHT : colors.BREAK_HIGHLIGHT}]}>
                <Image style={styles.image} source={icon}/>
            </View>
        </TouchableOpacity>
    );
};

export default PlayPauseStopButton;
import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import styles from './styles'
import colors from '../../constants/colors';

const PlayPauseStopButton = ({mode, playing, play, pause}) => {

    const pauseIcon = require('../../assets/images/pause.png');
    const playIcon = require('../../assets/images/play.png');
    const stopIcon = require('../../assets/images/stop.png');
    const [icon, setIcon] = useState('');

    const handlePress = () => {
        playing ? pause() : play();
    }

    useEffect(() => {
        playing ? setIcon(pauseIcon) : setIcon(playIcon)
    },[playing])

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.button, {backgroundColor: mode ? colors.WORK_HIGHLIGHT : colors.BREAK_HIGHLIGHT}]}>
                <Image style={styles.image} source={icon}/>
            </View>
        </TouchableOpacity>
    );
};

export default PlayPauseStopButton;
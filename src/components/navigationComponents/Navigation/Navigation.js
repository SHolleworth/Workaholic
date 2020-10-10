import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import styles from './styles'
import NavigationTouchable from '../NavigationTouchable';
import NavigationHighlight from '../NavigationHighlight';

const Navigation = ({mode, progress, activeScreen, transitionScreen}) => {
    const top = useWindowDimensions().height - styles.container.height * 1.36;
    const width = useWindowDimensions().width;

    const timerIcom = require('../../../assets/images/timer.png');
    const settingsIcon = require('../../../assets/images/settings.png');

    return (
        <View style={[styles.container, {top, width}]}>
            <NavigationHighlight mode={mode} progress={progress}/>
            <NavigationTouchable id={0} activeScreen={activeScreen} img={timerIcom} transitionScreen={transitionScreen}/>
            <NavigationTouchable id={1} activeScreen={activeScreen} img={settingsIcon} transitionScreen={transitionScreen}/>
        </View>
    );
};

export default Navigation;
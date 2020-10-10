import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles'

const SplashScreen = () => {
    
    const icon = require('../../assets/images/icon.png');

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.image}></Image>
        </View>
    );
};

export default SplashScreen;
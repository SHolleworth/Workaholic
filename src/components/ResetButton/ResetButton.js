import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles'

const ResetButton = ({reset}) => {
    
    const resetIcon = require('../../assets/images/reset.png');

    const handlePress = () => {
        reset();   
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.button}>
                <Image style={styles.image} source={resetIcon}/>
            </View>
        </TouchableOpacity>
    );
};

export default ResetButton;
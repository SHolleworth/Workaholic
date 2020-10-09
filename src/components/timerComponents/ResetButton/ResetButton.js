import React from 'react';
import {Image, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import styles from './styles'

const ResetButton = ({reset}) => {
    
    const resetIcon = require('../../../assets/images/reset.png');

    const handlePress = () => {
        reset();   
    }

    const height = useWindowDimensions().height / 12;

    return (
        <TouchableOpacity style={[styles.button, {height, width:height, borderRadius: height/2}]} onPress={handlePress}>
            <View style={[styles.button, {height, width:height, borderRadius: height/2}]}>
                <Image style={styles.image} source={resetIcon}/>
            </View>
        </TouchableOpacity>
    );
};

export default ResetButton;
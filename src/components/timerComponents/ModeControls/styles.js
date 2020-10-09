import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: .6,
        width: "95%",
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.DARK,
        borderRadius: 32,
    },
});

export default styles;
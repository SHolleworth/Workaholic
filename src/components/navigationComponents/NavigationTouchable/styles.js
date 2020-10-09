const { stopClock } = require("react-native-reanimated");

import {StyleSheet} from 'react-native';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: nav.NAV_HEIGHT / 2,
        borderTopRightRadius: nav.NAV_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 25,
        width: 25,
    },
    text: {
        fontFamily: 'Lato-Regular',
        color: 'white',
        marginLeft: 10,
    }
});

export default styles;
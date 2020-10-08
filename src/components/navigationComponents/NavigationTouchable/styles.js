const { stopClock } = require("react-native-reanimated");

import {StyleSheet} from 'react-native';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: nav.NAV_HEIGHT / 2,
        borderTopRightRadius: nav.NAV_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 30,
        width: 30,
    }
});

export default styles;
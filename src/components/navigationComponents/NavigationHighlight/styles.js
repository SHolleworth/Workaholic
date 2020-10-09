import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:5, right: 0, bottom: 0, left: 0,
        borderRadius: 25,
        height: nav.NAV_HEIGHT - 10,
        backgroundColor: colors.SECONDARY,
    },
});

export default styles;
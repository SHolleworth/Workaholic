import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        height: nav.NAV_HEIGHT,
        position: 'absolute',
        top:0, right: 0, bottom: 0, left: 0,
        flexDirection: 'row',
        backgroundColor: colors.DARK,
    },
});

export default styles;
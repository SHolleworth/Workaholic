import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0, right: 0, bottom: 0, left: 0,
        height: nav.NAV_HEIGHT,
        flexDirection: 'row',
        backgroundColor: colors.PRIMARY,
    },
});

export default styles;
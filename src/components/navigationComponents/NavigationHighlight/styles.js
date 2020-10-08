import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import nav from '../../../constants/navDimensions';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0, right: 0, bottom: 0, left: 0,
        borderRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: nav.height,
        backgroundColor: colors.SECONDARY,
    },
});

export default styles;
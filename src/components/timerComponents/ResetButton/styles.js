import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        borderRadius: 40,
        backgroundColor: colors.BACKGROUND,
        zIndex: 6,
    },

    image: {
        height: 30,
        width: 30,
    }
});

export default styles;
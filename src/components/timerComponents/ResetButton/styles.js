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
    },

    image: {
        height: 50,
        width: 50,
    }
});

export default styles;
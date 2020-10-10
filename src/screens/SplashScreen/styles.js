import {StyleSheet} from 'react-native';
import colors from  '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0, right: 0, bottom: 0, left: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BACKGROUND,
    },
    image: {
        height: 100,
        width: 100,
    },
});

export default styles;
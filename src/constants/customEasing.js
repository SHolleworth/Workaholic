import { Easing } from 'react-native-reanimated';

export default {
    heavy: Easing.bezier(.99,.01,1,1),
    mid: Easing.bezier(.85,.17,1,1),
    light: Easing.bezier(.67,.28,1,1),
}
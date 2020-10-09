import Animated, {Easing} from 'react-native-reanimated';
import cEasing from '../constants/customEasing';

const {
    clockRunning,
    call,
    block,
    not,
    set,
    timing,
    cond,
    stopClock,
    Value 
} = Animated;

const run = (clock, finish) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: new Value(500),
        toValue: new Value(1),
        easing: Easing.inOut(cEasing.mid),
    };

    return (block([
        cond(state.finished,
        [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            set(config.toValue, not(config.toValue)),
            call([], finish),
            stopClock(clock),
        ]),
        cond(clockRunning(clock), timing(clock, state, config)),
        state.position
    ]));
}

export default run;
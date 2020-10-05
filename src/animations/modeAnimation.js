import Animated, { call, Easing } from 'react-native-reanimated';

const {
    stopClock,
    clockRunning,
    Value,
    timing,
    block,
    cond,
    set,
    not,
} = Animated;

const run = (clock, finish) => {
    const state = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: new Value(500),
        toValue: new Value(1),
        easing: Easing.inOut(Easing.ease),
    }

    return(block([
        cond(clockRunning(clock), timing(clock, state, config)),
        cond(state.finished,
            [
                set(state.time, 0),
                set(state.frameTime, 0),
                set(state.finished, 0),
                set(config.toValue, not(state.position)),
                call([], finish),
                stopClock(clock),
            ]),
        state.position
    ]));
}

export default run;
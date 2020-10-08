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

const run = (clock, isMode, finish) => {
    const state = {
        position: new Value(0),
        finished: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: new Value(500),
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    }

    return(block([
        cond(clockRunning(clock),
        [
            set(config.toValue, not(isMode)),
            timing(clock, state, config),
        ]),
        cond(state.finished,
            [
                set(state.time, 0),
                set(state.frameTime, 0),
                set(state.finished, 0),
                call([], finish),
                stopClock(clock),
            ]),
        state.position
    ]));
}

export default run;
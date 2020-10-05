import Animated, { Easing } from 'react-native-reanimated';

const {
    Value,
    set,
    block,
    cond,
    and,
    not,
    call,
    stopClock,
    clockRunning,
    timing,
} = Animated;

const run = (clock, duration, isResetting, finish, endResetting) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: new Value(duration),
        toValue: new Value(1),
        easing: Easing.linear,
    };

    return (block([
        cond(and(not(clockRunning(clock)), not(state.finished)), set(state.time, 0)),
        cond(isResetting, 
        [
            set(state.position, 0),
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            call([], endResetting)
        ]),
        cond(state.finished,
        [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
            call([], finish),
            stopClock(clock),
        ]),
        cond(clockRunning(clock), timing(clock, state, config)),
        state.position
    ]));
}

export default run;
const convertTime = milliseconds => {
  let remainingMillis = milliseconds;
  const newHours = setToZero(Math.floor(remainingMillis / (1000 * 60 * 60)));
  remainingMillis = remainingMillis % (1000 * 60 * 60);
  const newMinutes = setToZero(Math.floor(remainingMillis / (1000 * 60)));
  remainingMillis = remainingMillis % (1000 * 60);
  const newSeconds = setToZero(Math.floor(remainingMillis / (1000)));
  remainingMillis = remainingMillis % 1000;
  const newMilliseconds = setToZero(remainingMillis);

  return {
    hours: newHours,
    minutes: newMinutes,
    seconds: newSeconds,
    milliseconds: newMilliseconds,
  };
}

const setToZero = (value) => {
  if(value < 0){
    return 0;
  }
  return value;
}

export default convertTime;
/**
 * @param {Moment} moment
 */
export function getIsPM(moment) {
  const hour = moment.hour();
  return hour < 12 ? false : true;
}

/**
 * @param {Moment}  moment
 * @param {boolean} is12Hour
 */
export function getHour(moment, is12Hour = false) {
  const hour = moment.hour();
  if (is12Hour) {
    return hour % 12 || 12;
  }
  return hour;
}

/**
 * @param {Moment}  moment
 * @param {number}  hour
 * @param {boolean} isPM
 * @param {boolean} is12Hour
 */
export function setHour(moment, hour, isPM, is12Hour = false) {
  const newMoment = moment.clone();
  if (is12Hour) {
    const newHour = (hour % 12) + (isPM ? 12 : 0);
    newMoment.hour(newHour);
  } else {
    newMoment.hour(hour);
  }
  return newMoment;
}

/**
 * @param {Moment} moment
 */
export function getMinute(moment) {
  const minute = moment.minute();
  return minute;
}

/**
 * @param {Moment} moment
 * @param {number} minute
 */
export function setMinute(moment, minute) {
  const newMoment = moment.clone();
  newMoment.minute(minute);
  return newMoment;
}

/**
 * @param {Moment} moment
 */
export function getSecond(moment) {
  const second = moment.second();
  return second;
}

/**
 * @param {Moment} moment
 * @param {number} second
 */
export function setSecond(moment, second) {
  const newMoment = moment.clone();
  return newMoment.second(second);
}

/**
 * @param {number} num
 */
export function createUnit(num) {
  return {
    label: String(num).padStart(2, '0'),
    value: num,
  };
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} step
 */
export function generateUnit(start, end, step = 1) {
  const units = [];
  for (let num = start; num <= end; num += step) {
    units.push(createUnit(num));
  }
  return units;
}

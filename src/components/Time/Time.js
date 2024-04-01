import { usePersistFn, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { isEqualDates, parseDate } from '@helpers/dateHelper';

import TimeGroup from './TimeGroup';
import TimeUnit from './TimeUnit';
import {
  createUnit,
  generateUnit,
  getHour,
  getIsPM,
  getMinute,
  getSecond,
  setHour,
  setMinute,
  setSecond,
} from './timeUtil';

const Time = React.forwardRef((props, ref) => {
  const {
    style,
    hourStep = 1,
    showHour = true,
    minuteStep = 1,
    showMinute = true,
    secondStep = 1,
    showSecond = true,
    use12Hours = false,
  } = props;

  const [date, setDate] = React.useState(() =>
    parseDate(props.date, moment({ hour: 0, minute: 0, second: 0 })),
  );

  const isPM = React.useMemo(() => {
    return getIsPM(date);
  }, [date]);

  const hour = React.useMemo(() => {
    return getHour(date, use12Hours);
  }, [date, use12Hours]);

  const minute = React.useMemo(() => {
    return getMinute(date);
  }, [date]);

  const second = React.useMemo(() => {
    return getSecond(date);
  }, [date]);

  const hours = React.useMemo(() => {
    const start = use12Hours ? 1 : 0;
    const end = use12Hours ? 11 : 23;

    const units = generateUnit(start, end, hourStep);
    if (use12Hours) {
      units.unshift(createUnit(12));
    }
    return units;
  }, [use12Hours, hourStep]);

  const minutes = React.useMemo(() => {
    return generateUnit(0, 59, minuteStep);
  }, [minuteStep]);

  const seconds = React.useMemo(() => {
    return generateUnit(0, 59, secondStep);
  }, [secondStep]);

  const meridiems = React.useMemo(() => {
    return [
      { label: 'SA', value: false },
      { label: 'CH', value: true },
    ];
  }, []);

  useUpdateEffect(() => {
    const nextDate = parseDate(
      props.date,
      moment({ hour: 0, minute: 0, second: 0 }),
    );
    if (!isEqualDates(date, nextDate)) {
      setDate(newDate);
    }
  }, [props.date]);

  const onHourChange = usePersistFn((newHour) => {
    const newDate = setHour(date, newHour, isPM, use12Hours);
    setDate(newDate);
    props.onSelect?.(newDate);
  });

  const onMinuteChange = usePersistFn((newMinute) => {
    const newDate = setMinute(date, newMinute);
    setDate(newDate);
    props.onSelect?.(newDate);
  });

  const onSecondChange = usePersistFn((newSecond) => {
    const newDate = setSecond(date, newSecond);
    setDate(newDate);
    props.onSelect?.(newDate);
  });

  const onMeridiemChange = usePersistFn((newIsPM) => {
    const newDate = setHour(date, date.hour(), newIsPM, use12Hours);
    setDate(newDate);
    props.onSelect?.(newDate);
  });

  React.useImperativeHandle(
    ref,
    () => ({
      selectedDate: date,
    }),
    [date],
  );

  return (
    <TimeGroup style={style}>
      <TimeUnit
        visible={showHour}
        data={hours}
        value={hour}
        onChange={onHourChange}
      />
      <TimeUnit
        visible={showMinute}
        data={minutes}
        value={minute}
        onChange={onMinuteChange}
      />
      <TimeUnit
        visible={showSecond}
        data={seconds}
        value={second}
        onChange={onSecondChange}
      />
      <TimeUnit
        visible={use12Hours}
        data={meridiems}
        value={isPM}
        onChange={onMeridiemChange}
      />
    </TimeGroup>
  );
});

Time.propTypes = {
  date: PropTypes.any,
  onSelect: PropTypes.func,
};

export default Time;

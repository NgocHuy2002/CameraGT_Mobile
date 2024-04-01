import { Calendar as RkCalendar } from '@ui-kitten/components';
import { usePersistFn, useUpdateEffect } from 'ahooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { cloneDate, isEqualDates } from '@helpers/dateHelper';

import BaseCalendar from './BaseCalendar';

const Calendar = (props) => {
  const [date, setDate] = React.useState(() => moment(props.date));

  useUpdateEffect(() => {
    const newDate = moment(props.date);
    if (!isEqualDates(date, newDate)) {
      setDate(newDate);
    }
  }, [props.date]);

  const onSelect = usePersistFn((selectedDate) => {
    const newDate = cloneDate(date, selectedDate);
    setDate(newDate);
    props.onSelect?.(newDate);
  });

  const onTodayPress = usePersistFn(() => {
    onSelect(moment());
  });

  return (
    <BaseCalendar
      {...props}
      component={RkCalendar}
      date={date}
      onSelect={onSelect}
      onTodayPress={onTodayPress}
    />
  );
};

Calendar.propTypes = {
  date: PropTypes.any,
  onSelect: PropTypes.func,
};

export default Calendar;

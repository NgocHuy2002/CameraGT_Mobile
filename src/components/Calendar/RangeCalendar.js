import { RangeCalendar as RkRangeCalendar } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';

import BaseCalendar from './BaseCalendar';

const RangeCalendar = (props) => {
  return (
    <BaseCalendar
      boundingMonth={false}
      {...props}
      component={RkRangeCalendar}
    />
  );
};

RangeCalendar.propTypes = {
  range: PropTypes.any,
};

export default RangeCalendar;

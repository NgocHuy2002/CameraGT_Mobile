import React from 'react';

import RangeCalendar from '@components/Calendar/RangeCalendar';

import BaseDatePicker from './BaseDatePicker';

const RangeDatePicker = React.forwardRef((props, modalRef) => {
  return <BaseDatePicker ref={modalRef} {...props} component={RangeCalendar} />;
});

export default RangeDatePicker;

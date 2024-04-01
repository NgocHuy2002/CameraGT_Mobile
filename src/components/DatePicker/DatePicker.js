import React from 'react';

import Calendar from '@components/Calendar/Calendar';

import BaseDatePicker from './BaseDatePicker';

const DatePicker = React.forwardRef((props, modalRef) => {
  return <BaseDatePicker ref={modalRef} {...props} component={Calendar} />;
});

export default DatePicker;

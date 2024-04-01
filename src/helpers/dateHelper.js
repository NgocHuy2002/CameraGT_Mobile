import moment from 'moment';

export const parseDate = (value = null, defaultValue) => {
  const date = moment(value);
  if (date.isValid()) {
    return date;
  }
  return defaultValue;
};

export const parseString = (value = null, defaultValue = '') => {
  const date = moment(value);
  if (date.isValid()) {
    return date.toISOString();
  }
  return defaultValue;
};

export const cloneDate = (date1, date2) => {
  const newDate = date1.clone();
  newDate.year(date2.year());
  newDate.month(date2.month());
  newDate.date(date2.date());
  return newDate;
};

export const isEqualDates = (date1, date2) => {
  if (moment(date1).isSame(date2)) {
    return true;
  }
  return false;
};

export const isEqualRangeDates = (rangeDate1, rangeDate2) => {
  if (!isEqualDates(rangeDate1.startDate, rangeDate2.startDate)) {
    return false;
  }
  if (!isEqualDates(rangeDate1.endDate, rangeDate2.endDate)) {
    return false;
  }
  return true;
};

export const getFormatDate = (value = null, defaultValue = '') => {
  const date = moment(value);
  if (date.isValid()) {
    return date.format('DD/MM/YYYY');
  }
  return defaultValue;
};

export const getFormatTime = (value = null, defaultValue = '') => {
  const date = moment(value);
  if (date.isValid()) {
    return date.format('HH:mm');
  }
  return defaultValue;
};

export const getFormatDateTime = (value = null, defaultValue = '') => {
  const date = moment(value);
  if (date.isValid()) {
    return date.format('DD/MM/YYYY HH:mm');
  }
  return defaultValue;
};

export const getFormatReferenceTime = (value = null, defaultValue = '') => {
  const date = moment(value);
  if (date.isValid()) {
    return date.calendar();
  }
  return defaultValue;
};

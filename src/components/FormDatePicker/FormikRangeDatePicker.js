import { usePersistFn } from 'ahooks';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import FormRangeDatePicker from './FormRangeDatePicker';

const useRangeField = (name) => {
  if (Array.isArray(name)) {
    const [startField, , startHelpers] = useField(name[0]);
    const [endField, , endHelpers] = useField(name[1]);

    const value = React.useMemo(() => {
      return [startField.value, endField.value];
    }, [startField.value, endField.value]);

    const setValue = usePersistFn((newValue) => {
      startHelpers.setValue(newValue[0]);
      endHelpers.setValue(newValue[1]);
    });

    return [{ value }, , { setValue }];
  }

  return useField(name);
};

const FormikRangeDatePicker = (props) => {
  const { name, ...restProps } = props;

  const [field, , helpers] = useRangeField(name);
  const { value } = field;

  const onChange = usePersistFn((newValue) => {
    helpers.setValue(newValue);
    props.onChange?.(newValue);
  });

  return (
    <FormRangeDatePicker
      name={name}
      value={value}
      {...restProps}
      onChange={onChange}
    />
  );
};

FormikRangeDatePicker.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default FormikRangeDatePicker;

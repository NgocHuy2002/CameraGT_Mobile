import { Icon, Input, Text } from '@ui-kitten/components';
import { usePersistFn, useUpdateEffect } from 'ahooks';
import toLower from 'lodash/toLower';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import DatePicker from '@components/DatePicker/DatePicker';
import useFormControlState from '@components/FormControl/useFormControlState';

import { isEqualDates, parseDate, parseString } from '@helpers/dateHelper';
import renderNode from '@helpers/renderNode';

const FormDatePicker = (props) => {
  const {
    icon = { name: 'calendar' },
    value,
    format = 'DD/MM/YYYY',
    parseValue = parseString,
    formatValue = parseDate,
    containerStyle,
    ...restProps
  } = props;

  const fcs = useFormControlState({
    props,
    states: ['status', 'disabled', 'readonly', 'required'],
  });

  const inputRef = React.useRef(null);
  const pickerRef = React.useRef(null);

  const [date, setDate] = React.useState(() => formatValue(value));

  const placeholder = React.useMemo(() => {
    const formatStr = toLower(format);
    return formatStr;
  }, [format]);

  const displayValue = React.useMemo(() => {
    if (date && date.isValid()) {
      return date.format(format);
    }
    return '';
  }, [date, format]);

  useUpdateEffect(() => {
    const nextDate = formatValue(value);
    if (!isEqualDates(date, nextDate)) {
      setDate(nextDate);
    }
  }, [value]);

  const showPicker = usePersistFn(() => {
    pickerRef.current?.show();
  });

  const hidePicker = usePersistFn(() => {
    pickerRef.current?.hide();
  });

  const onSelect = usePersistFn((selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);
  });

  const onChange = usePersistFn((selectedDate) => {
    if (props.onChange) {
      props.onChange(parseValue(selectedDate));
    }
  });

  const onModalShow = usePersistFn(() => {
    inputRef.current?.onTextFieldFocus();
  });

  const onModalHide = usePersistFn(() => {
    inputRef.current?.onTextFieldBlur();
  });

  const renderIcon = usePersistFn((iconProps) =>
    renderNode(Icon, icon, iconProps),
  );

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{displayValue}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback style={containerStyle} onPress={showPicker}>
      <View pointerEvents="box-only">
        <Input
          ref={inputRef}
          {...fcs}
          placeholder={placeholder}
          accessoryRight={icon && renderIcon}
          {...restProps}
          value={displayValue}
        />
        <DatePicker
          ref={pickerRef}
          {...restProps}
          date={date}
          onSelect={onSelect}
          onModalShow={onModalShow}
          onModalHide={onModalHide}
          onBackdropPress={hidePicker}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

FormDatePicker.propTypes = {
  value: PropTypes.any,
  format: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormDatePicker;

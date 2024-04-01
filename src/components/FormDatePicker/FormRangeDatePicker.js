import { Icon, Input, Text } from '@ui-kitten/components';
import { usePersistFn, useUpdateEffect } from 'ahooks';
import toLower from 'lodash/toLower';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import RangeDatePicker from '@components/DatePicker/RangeDatePicker';

import { isEqualRangeDates, parseDate, parseString } from '@helpers/dateHelper';
import renderNode from '@helpers/renderNode';

function FormRangeDatePicker(props) {
  const {
    icon = { name: 'calendar' },
    value,
    format = 'DD/MM/YYYY',
    readonly,
    parseValue = parseString,
    formatValue = parseDate,
    containerStyle,
    ...restProps
  } = props;

  const inputRef = React.useRef();

  const [visible, setVisible] = React.useState(false);

  const [rangeDate, setRangeDate] = React.useState(() => {
    const startDate = formatValue(value?.[0]);
    const endDate = formatValue(value?.[1]);
    return { startDate, endDate };
  });

  const placeholder = React.useMemo(() => {
    const formatStr = toLower(format);
    return `${formatStr} - ${formatStr}`;
  }, [format]);

  const displayValue = React.useMemo(() => {
    const { startDate, endDate } = rangeDate;
    if (startDate || endDate) {
      const startStr = startDate ? startDate.format(format) : '';
      const endStr = endDate ? endDate.format(format) : '';
      return `${startStr} - ${endStr}`;
    }
    return '';
  }, [rangeDate, format]);

  useUpdateEffect(() => {
    const startDate = formatValue(value?.[0]);
    const endDate = formatValue(value?.[1]);

    const nextRangeDate = { startDate, endDate };
    if (!isEqualRangeDates(rangeDate, nextRangeDate)) {
      setRangeDate(nextRangeDate);
    }
  }, [value]);

  const toggleVisible = usePersistFn(() => {
    setVisible((visible) => !visible);
  });

  const onSelect = usePersistFn((selectedRange) => {
    setRangeDate(selectedRange);
    onChange(selectedRange);
  });

  const onChange = usePersistFn((selectedRange) => {
    const { startDate, endDate } = selectedRange;
    const startValue = parseValue(startDate);
    const endValue = parseValue(endDate);
    const rangeValue = [startValue, endValue];
    if (startDate && endDate) {
      setVisible(false);
    }
    if (props.onChange) {
      props.onChange(rangeValue);
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

  if (readonly) {
    return (
      <View style={containerStyle}>
        <Text>{displayValue}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback style={containerStyle} onPress={toggleVisible}>
      <View pointerEvents="box-only">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          accessoryRight={icon && renderIcon}
          {...restProps}
          value={displayValue}
        />
        <RangeDatePicker
          {...restProps}
          range={rangeDate}
          visible={visible}
          onSelect={onSelect}
          onModalShow={onModalShow}
          onModalHide={onModalHide}
          onBackdropPress={toggleVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

FormRangeDatePicker.propTypes = {
  value: PropTypes.array,
  format: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormRangeDatePicker;

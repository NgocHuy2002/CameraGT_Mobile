import { Radio, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import useFormControlState from '@components/FormControl/useFormControlState';
import { Column } from '@components/Stack';

export default function FormRadio(props) {
  const {
    value,
    options = [],
    onChange,
    uniqueKey = 'value',
    displayKey = 'label',
    containerStyle,
  } = props;

  const fcs = useFormControlState({
    props,
    states: ['status', 'disabled', 'readonly', 'required'],
  });

  const parseValue = (selected) => {
    if (props.parseValue) return props.parseValue(selected);
    if (typeof selected === 'object') return selected[uniqueKey];
    return selected;
  };

  const formatValue = (value) => {
    if (props.formatValue) return props.formatValue(value);
    return value;
  };

  const getOptionLabel = (option) => {
    if (props.getOptionLabel) return props.getOptionLabel(option);
    if (typeof option === 'object') return option[displayKey];
    return option;
  };

  const getOptionValue = (option) => {
    if (props.getOptionValue) return props.getOptionValue(option);
    if (typeof option === 'object') return option[uniqueKey];
    return option;
  };

  const getOptionChecked = (option) => {
    return value === getOptionValue(option);
  };

  const getOptionDisabled = (option) => {
    if (props.getOptionDisabled) return props.getOptionDisabled(option);
    if (typeof option === 'object') return option.disabled;
    return false;
  };

  const onRadioChange = (option) => {
    if (onChange) onChange(parseValue(option));
  };

  const renderOption = (option) => (
    <Radio
      key={getOptionValue(option)}
      status={fcs.status}
      checked={getOptionChecked(option)}
      disabled={fcs.disabled || getOptionDisabled(option)}
      onChange={() => onRadioChange(option)}
    >
      {getOptionLabel(option)}
    </Radio>
  );

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{formatValue(value)}</Text>
      </View>
    );
  }

  return (
    <Column space={1} style={containerStyle}>
      {options.map(renderOption)}
    </Column>
  );
}

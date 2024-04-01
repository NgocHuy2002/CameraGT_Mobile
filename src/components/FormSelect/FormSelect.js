import { styled } from '@ui-kitten/components';
import { IndexPath, Select, SelectItem, Text } from '@ui-kitten/components';
import isPlainObject from 'lodash/isPlainObject';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import useFormControlState from '@components/FormControl/useFormControlState';

function FormSelect(props) {
  const {
    eva,
    value,
    options = [],
    onChange,
    multiple,
    uniqueKey = 'value',
    displayKey = 'label',
    containerStyle,
    ...selectProps
  } = props;

  const fcs = useFormControlState({
    props,
    states: ['status', 'variant', 'disabled', 'readonly', 'required'],
  });

  const { borderColor, borderBottomWidth } = eva.style;

  const computedStyle = React.useMemo(
    () => ({
      container: {
        borderBottomWidth,
        borderBottomColor: borderColor,
      },
    }),
    [],
  );

  const parseValue = (selected) => {
    if (props.parseValue) return props.parseValue(selected);
    if (isPlainObject(selected)) return selected[uniqueKey];
    return selected;
  };

  const formatValue = (value) => {
    if (props.formatValue) return props.formatValue(value);
    return value;
  };

  const getOptionLabel = (option) => {
    if (props.getOptionLabel) return props.getOptionLabel(option);
    if (isPlainObject(option)) return option[displayKey];
    return option;
  };

  const getOptionValue = (option) => {
    if (props.getOptionValue) return props.getOptionValue(option);
    if (isPlainObject(option)) return option[uniqueKey];
    return option;
  };

  const computedValue = React.useMemo(() => {
    if (Array.isArray(value) && multiple) {
      return value.map(formatValue);
    }
    return formatValue(value);
  }, [value, multiple]);

  const computedOptions = React.useMemo(() => {
    const results = [];
    for (let i = 0; i < options.length; i += 1) {
      const option = options[i];
      results.push(getOptionValue(option));
    }
    return results;
  }, [options]);

  const selectedIndex = React.useMemo(() => {
    if (Array.isArray(computedValue) && multiple) {
      const indexesPath = computedValue.reduce((results, currValue) => {
        const foundIndex = computedOptions.indexOf(getOptionValue(currValue));
        if (foundIndex !== -1) {
          results.push(new IndexPath(foundIndex));
        }
        return results;
      }, []);
      return indexesPath;
    }
    if (computedValue !== undefined) {
      const foundIndex = computedOptions.indexOf(getOptionValue(computedValue));
      if (foundIndex !== -1) {
        const indexPath = new IndexPath(foundIndex);
        return indexPath;
      }
    }
    return null;
  }, [multiple, computedValue, computedOptions]);

  const displayValue = React.useMemo(() => {
    if (options.length > 0 && selectedIndex) {
      if (Array.isArray(selectedIndex) && multiple) {
        return selectedIndex
          .map(({ row }) => getOptionLabel(options[row]))
          .join(', ');
      }
      return getOptionLabel(options[selectedIndex.row]);
    }
    return '';
  }, [options, multiple, selectedIndex]);

  const onSelectChange = React.useCallback(
    (selectedPath) => {
      let selectedOption;
      if (multiple) {
        selectedOption = selectedPath.map(({ row }) =>
          parseValue(options[row]),
        );
      } else {
        selectedOption = parseValue(options[selectedPath.row]);
      }
      if (onChange) {
        onChange(selectedOption);
      }
    },
    [options, multiple],
  );

  const renderOption = React.useCallback(
    (option) => (
      <SelectItem key={getOptionValue(option)} title={getOptionLabel(option)} />
    ),
    [],
  );

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{displayValue}</Text>
      </View>
    );
  }

  return (
    <View style={[computedStyle.container, containerStyle]}>
      <Select
        {...fcs}
        {...selectProps}
        value={displayValue}
        onSelect={onSelectChange}
        multiSelect={multiple}
        selectedIndex={selectedIndex}
      >
        {options.map(renderOption)}
      </Select>
    </View>
  );
}

FormSelect.propTypes = {
  value: PropTypes.any,
  uniqueKey: PropTypes.string,
  displayKey: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  parseValue: PropTypes.func,
  formatValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};

FormSelect.defaultProps = {
  placeholder: 'Lựa chọn',
};

export default styled('Select')(FormSelect);

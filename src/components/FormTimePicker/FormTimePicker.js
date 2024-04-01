import { Icon, Input, Text } from '@ui-kitten/components';
import { usePersistFn, useUpdateEffect } from 'ahooks';
import toLower from 'lodash/toLower';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import TimePicker from '@components/TimePicker/TimePicker';

import { parseDate, parseString } from '@helpers/dateHelper';
import renderNode from '@helpers/renderNode';

const FormTimePicker = (props) => {
  const {
    icon = { name: 'clock' },
    value,
    format = 'HH:mm:ss',
    readonly,
    showSecond,
    use12Hours,
    parseValue = parseString,
    formatValue = parseDate,
    containerStyle,
    ...restProps
  } = props;

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
    return null;
  }, [date, format]);

  useUpdateEffect(() => {
    if (value) {
      setDate(formatValue(value));
    } else {
      setDate(null);
    }
  }, [value]);

  const showPicker = usePersistFn(() => {
    pickerRef.current?.show();
  });

  const hidePicker = usePersistFn(() => {
    pickerRef.current?.hide();
  });

  const onConfirm = usePersistFn((newDate) => {
    setDate(newDate);
    props.onChange?.(parseValue(newDate));
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
    <TouchableWithoutFeedback style={containerStyle} onPress={showPicker}>
      <View pointerEvents="box-only">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          accessoryRight={icon && renderIcon}
          {...restProps}
          value={displayValue}
        />
        <TimePicker
          ref={pickerRef}
          date={date}
          onConfirm={onConfirm}
          showSecond={showSecond}
          use12Hours={use12Hours}
          onModalShow={onModalShow}
          onModalHide={onModalHide}
          onBackdropPress={hidePicker}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

FormTimePicker.propTypes = {
  value: PropTypes.any,
  format: PropTypes.string,
  onChange: PropTypes.func,
  showSecond: PropTypes.bool,
  use12Hours: PropTypes.bool,
};

export default FormTimePicker;

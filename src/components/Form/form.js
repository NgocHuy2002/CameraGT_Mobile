import { CheckBox, Input, Text } from '@ui-kitten/components';
import React from 'react';

export const CustomForm = ({
  label,
  checked,
  onChangeText,
  onChange,
  placeholder,
  type,
  key,
  style,
  accessoryRight,
  secureTextEntry,
}) => {
  switch (type) {
    case 'text':
      return (
        <Input
          style={style}
          label={label || null}
          placeholder={placeholder || null}
          onChangeText={onChangeText}
          key={key}
        />
      );
      break;
    case 'pass':
      return (
        <Input
          style={style}
          label={label || null}
          placeholder={placeholder || null}
          key={key}
          onChangeText={onChangeText}
          accessoryRight={accessoryRight}
          secureTextEntry={secureTextEntry}
        />
      );
      break;
    case 'checkBox':
      return (
        <CheckBox checked={checked} onChange={onChange} style={style}>
          <Text>{label}</Text>
        </CheckBox>
      );
      break;
    default:
      break;
  }
};

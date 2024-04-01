import { Icon, Input, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useState } from 'react';
import { Linking, Platform, TouchableOpacity, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import useFormControlState from '@components/FormControl/useFormControlState';

import renderNode from '@helpers/renderNode';

const FormInput = forwardRef((props, ref) => {
  const {
    password = false,
    icon,
    captionIcon,
    onIconPress,
    accessoryRight,
    secureTextEntry,
    onSubmitEditing,
    textStyle,
    containerStyle,
    ...inputProps
  } = props;

  const [passwordSecure, setPasswordSecure] = useState(password);

  const fcs = useFormControlState({
    props,
    states: ['status', 'variant', 'disabled', 'readonly', 'required'],
  });

  const renderIcon = useCallback(
    (iconProps) => {
      if (onIconPress) {
        return (
          <TouchableOpacity onPress={onIconPress}>
            {renderNode(Icon, icon, iconProps)}
          </TouchableOpacity>
        );
      }
      return renderNode(Icon, icon, iconProps);
    },
    [icon, onIconPress],
  );

  const renderEyeIcon = useCallback(
    (iconProps) => (
      <TouchableOpacity onPress={() => setPasswordSecure(!passwordSecure)}>
        {renderNode(
          Icon,
          {
            name: passwordSecure ? 'eye' : 'eye-close',
            pack: 'app',
            width: 20,
            height: 20,
          },
          iconProps,
        )}
      </TouchableOpacity>
    ),
    [passwordSecure],
  );

  const renderCaptionIcon = useCallback(
    (iconProps) => renderNode(Icon, captionIcon, iconProps),
    [captionIcon],
  );

  const urlText = (value) => {
    if (
      value.toString().startsWith('http://') ||
      value.toString().startsWith('https://')
    ) {
      return (
        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(value)}>
          {value}
        </Text>
      );
    } else {
      return <Text>{value}</Text>;
    }
  };

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        {inputProps.value ? <Text>{urlText(inputProps.value)}</Text> : null}
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Input
        ref={ref}
        {...fcs}
        // accessoryRight={icon ? renderIcon : password && renderEyeIcon}
        accessoryRight={accessoryRight}
        // secureTextEntry={password ? secureTextEntry : null}
        {...(password && {
          autoCapitalize: 'none',
          secureTextEntry: secureTextEntry,
        })}
        {...inputProps}
        onSubmitEditing={onSubmitEditing}
        textStyle={[inputProps.multiline && [tw.pT0, tw.h10], textStyle]}
        captionIcon={captionIcon && renderCaptionIcon}
        textAlignVertical={inputProps.multiline && 'top'}
      />
    </View>
  );
});

export default FormInput;

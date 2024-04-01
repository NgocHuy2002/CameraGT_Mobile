import React from 'react';
import { Dimensions } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const spacingHeight =
  Dimensions.get('screen').height - Dimensions.get('window').height;

export default (props) => {
  return <KeyboardSpacer topSpacing={spacingHeight} {...props} />;
};

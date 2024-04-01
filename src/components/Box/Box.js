import { styled } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

function Box(props) {
  const { eva, ...restProps } = props;

  return <View {...restProps} />;
}

export default styled('Box')(Box);

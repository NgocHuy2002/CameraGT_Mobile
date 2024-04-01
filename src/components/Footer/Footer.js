import { styled } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import useSafeAreaStyle from '@components/SafeAreaView/useSafeAreaStyle';

function Footer(props) {
  const { eva, style, safeAreaEnabled = true, ...restProps } = props;

  const safeStyle = useSafeAreaStyle(['bottom'], style);

  return (
    <View
      {...restProps}
      style={[eva.style, style, safeAreaEnabled && safeStyle]}
    />
  );
}

export default styled('Layout')(Footer);

import { styled } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';

import useSafeAreaStyle from '@components/SafeAreaView/useSafeAreaStyle';
import Toolbar from '@components/Toolbar/Toolbar';

function Header(props) {
  const { eva, style, safeAreaEnabled = true, ...restProps } = props;

  const safeStyle = useSafeAreaStyle(['top'], style);

  return (
    <View style={[eva.style, style, safeAreaEnabled && safeStyle]}>
      {props.children ? (
        props.children
      ) : (
        <Toolbar {...restProps} style={[eva.style, style]} />
      )}
    </View>
  );
}

export default styled('TopNavigation')(Header);

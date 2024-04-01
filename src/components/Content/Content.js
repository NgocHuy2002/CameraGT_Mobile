import { styled } from '@ui-kitten/components';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { tw } from 'react-native-tailwindcss';

import useSafeAreaStyle from '@components/SafeAreaView/useSafeAreaStyle';

function Content(props) {
  const {
    eva,
    style,
    children,
    scrollEnabled = true,
    safeAreaEnabled = true,
    keyboardEnabled = false,
    contentContainerStyle,
    ...restProps
  } = props;

  const safeStyle = useSafeAreaStyle(['bottom'], style);
  const safeContentStyle = useSafeAreaStyle(['bottom'], contentContainerStyle);

  const Component = keyboardEnabled ? KeyboardAwareScrollView : ScrollView;

  if (scrollEnabled) {
    return (
      <Component
        {...restProps}
        style={[eva.style, style]}
        contentContainerStyle={[
          tw.flexGrow,
          contentContainerStyle,
          safeAreaEnabled && safeContentStyle,
        ]}
      >
        {children}
      </Component>
    );
  }
  return (
    <View
      {...restProps}
      style={[tw.flex1, eva.style, style, safeAreaEnabled && safeStyle]}
    >
      {children}
    </View>
  );
}

const StyledContent = styled('Layout')(Content);

StyledContent.defaultProps = {
  level: '1',
};

export default StyledContent;

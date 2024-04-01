import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function useSafeAreaStyle(edges = [], baseStyle) {
  const insets = useSafeAreaInsets();

  const safeStyle = React.useMemo(() => {
    const flatStyle = StyleSheet.flatten(baseStyle || {});

    const insetTop = edges.includes('top') ? insets.top : 0;
    const insetRight = edges.includes('right') ? insets.right : 0;
    const insetBottom = edges.includes('bottom') ? insets.bottom : 0;
    const insetLeft = edges.includes('left') ? insets.left : 0;

    const {
      padding = 0,
      paddingVertical = padding,
      paddingHorizontal = padding,
      paddingTop = paddingVertical,
      paddingRight = paddingHorizontal,
      paddingBottom = paddingVertical,
      paddingLeft = paddingHorizontal,
    } = flatStyle;

    const paddingStyle = {
      paddingTop: paddingTop + insetTop,
      paddingRight: paddingRight + insetRight,
      paddingBottom: paddingBottom + insetBottom,
      paddingLeft: paddingLeft + insetLeft,
    };

    return paddingStyle;
  }, [baseStyle, insets]);

  return safeStyle;
}

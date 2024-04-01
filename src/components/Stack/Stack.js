import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { getSpacedChildren } from './utils';

export const Stack = ({
  children,
  divider,
  space,
  style,
  wrap,
  center,
  align,
  justify,
  direction = 'column',
  ...props
}) => {
  const baseStyle = React.useMemo(
    () => ({
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: align || (center ? 'center' : undefined),
      justifyContent: justify || (center ? 'center' : undefined),
    }),
    [direction, wrap, center, align, justify],
  );

  const axis = React.useMemo(() => {
    return direction === 'row' || direction === 'row-reverse' ? 'X' : 'Y';
  }, [direction]);

  return (
    <View {...props} style={[baseStyle, style]}>
      {getSpacedChildren(children, space, axis, divider)}
    </View>
  );
};

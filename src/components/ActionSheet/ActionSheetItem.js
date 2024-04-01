import { Icon, MenuItem, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import renderNode from '@helpers/renderNode';

export default function ActionSheetItem(props) {
  const { icon, title, ...restProps } = props;

  const renderIcon = React.useCallback(
    (icon) => (iconProps) => (
      <View style={[tw.absolute, tw.pX2]}>
        {renderNode(Icon, icon, iconProps)}
      </View>
    ),
    [],
  );

  const renderText = React.useCallback(
    (text) =>
      ({ style, ...textProps }) => {
        const { color, ...textStyle } = StyleSheet.flatten(style);

        return (
          <Text
            {...textProps}
            style={[textStyle, tw.pY1, tw.textCenter]}
            status="primary"
          >
            {text}
          </Text>
        );
      },
    [],
  );

  return (
    <MenuItem
      {...restProps}
      title={title && renderText(title)}
      accessoryLeft={icon && renderIcon(icon)}
    />
  );
}

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

const IconProvider = (Icon, name) => ({
  toReactElement: (props) => {
    const { fill, style, ...restProps } = props;

    const { width, height } = StyleSheet.flatten([style, props]);
    const { tintColor, ...restStyle } = StyleSheet.flatten(style || {});

    return (
      <Icon
        {...restProps}
        name={name}
        size={width || height}
        color={fill || tintColor}
        style={restStyle}
      />
    );
  },
});

const createIconsMap = (Icon) =>
  new Proxy({}, { get: (target, name) => IconProvider(Icon, name) });

export const MaterialIconsPack = {
  name: 'material',
  icons: createIconsMap(MaterialIcons),
};

export const FontAwesomeIconsPack = {
  name: 'font-awesome',
  icons: createIconsMap(FontAwesome),
};

export const FontAwesome5IconsPack = {
  name: 'font-awesome5',
  icons: createIconsMap(FontAwesome5),
};

export const MaterialCommunityIconsPack = {
  name: 'material-community',
  icons: createIconsMap(MaterialCommunityIcons),
};

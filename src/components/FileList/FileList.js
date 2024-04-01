import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import FileItem from './FileItem';

export default function FileList(props) {
  const { files, variant, onRemovePress, containerStyle, ...restProps } = props;

  const _keyExtractor = React.useCallback((_, index) => `file-${index}`, []);

  const _onRemovePress = React.useCallback(
    (index) => (file) => {
      if (onRemovePress) {
        onRemovePress(file, index);
      }
    },
    [],
  );

  const _renderItem = React.useCallback(
    ({ item, index }) => (
      <FileItem
        file={item}
        variant={variant}
        onRemovePress={_onRemovePress(index)}
      />
    ),
    [],
  );

  const _renderItemSeparator = React.useCallback(
    () => <View style={tw.h1} />,
    [],
  );

  return (
    <View style={containerStyle}>
      <FlatList
        data={files}
        keyExtractor={_keyExtractor}
        {...restProps}
        renderItem={_renderItem}
        ItemSeparatorComponent={_renderItemSeparator}
      />
    </View>
  );
}

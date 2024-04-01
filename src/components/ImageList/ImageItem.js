import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import Avatar from '@components/Avatar/Avatar';

export default function ImageItem(props) {
  const {
    item,
    onPress,
    imageStyle,
    onRemovePress,
    containerStyle,
    showEditButton,
    ...restProps
  } = props;

  return (
    <View style={[showEditButton && [tw.pT2, tw.pR2], containerStyle]}>
      <Avatar
        level="3"
        style={[tw.w20, tw.h20, tw.rounded, imageStyle]}
        source={{ uri: item.uri }}
        onPress={() => onPress?.(item)}
      />
      {showEditButton && (
        <Avatar
          icon={{ name: 'close' }}
          style={[tw.absolute, tw.w4, tw.h4, tw.right0]}
          status="danger"
          onPress={() => onRemovePress?.(item)}
        />
      )}
    </View>
  );
}

ImageItem.propTypes = {
  item: PropTypes.any,
  showEditButton: PropTypes.bool,
};

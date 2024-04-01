import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { tw } from 'react-native-tailwindcss';

import Lightbox from '@components/Lightbox/Lightbox';

import ImageItem from './ImageItem';

export default function ImageList(props) {
  const {
    data,
    onItemPress,
    onRemovePress,
    containerStyle,
    itemImageStyle,
    showEditButton,
    ...restProps
  } = props;

  const lightBox = useRef(null);

  const renderItem = ({ item, index }) => (
    <ImageItem
      item={item}
      imageStyle={itemImageStyle}
      onPress={() => {
        onItemPress?.(item, index);
        lightBox.current?.open(index);
      }}
      onRemovePress={() => onRemovePress?.(item, index)}
      showEditButton={showEditButton}
    />
  );

  return (
    <View style={containerStyle}>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(_, index) => `item-${index}`}
        {...restProps}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={tw.w2} />}
      />
      <Portal>
        <Lightbox ref={lightBox} images={data} />
      </Portal>
    </View>
  );
}

ImageList.propTypes = {
  data: PropTypes.array,
  showEditButton: PropTypes.bool,
};

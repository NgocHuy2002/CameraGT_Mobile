import { Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { tw } from 'react-native-tailwindcss';

function Lightbox(props, ref) {
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const [imageIndex, setImageIndex] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    setImages(props.images ?? []);
  }, [props.images]);

  React.useEffect(() => {
    setVisible(props.visible ?? false);
  }, [props.visible]);

  React.useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  const open = React.useCallback((imageIndex, images) => {
    setVisible(true);
    if (images) {
      setImages(images);
    }
    if (imageIndex >= 0) {
      setImageIndex(imageIndex);
      setCurrentIndex(imageIndex);
    }
  }, []);

  const close = React.useCallback(() => {
    setVisible(false);
  }, []);

  const onIndexChange = React.useCallback((imageIndex) => {
    setCurrentIndex(imageIndex);
  }, []);

  const renderFooter = React.useCallback(
    () => (
      <View style={[tw.h16, tw.itemsCenter, tw.justifyCenter]}>
        <Text status="control">{`${currentIndex + 1} / ${images.length}`}</Text>
      </View>
    ),
    [images, currentIndex],
  );

  return (
    <ImageView
      {...props}
      images={images}
      visible={visible}
      imageIndex={imageIndex}
      onRequestClose={close}
      FooterComponent={renderFooter}
      onImageIndexChange={onIndexChange}
    />
  );
}

export default React.forwardRef(Lightbox);

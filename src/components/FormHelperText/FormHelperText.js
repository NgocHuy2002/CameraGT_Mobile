import { styled } from '@ui-kitten/components';
import { Icon, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import renderNode from '@helpers/renderNode';

function FormHelperText(props) {
  const {
    eva,
    icon,
    status,
    textStyle,
    containerStyle,
    iconContainerStyle,
    ...textProps
  } = props;

  const {
    captionColor,
    captionFontSize,
    captionLineHeight,
    captionFontWeight,
    captionIconWidth,
    captionIconHeight,
    captionIconTintColor,
  } = eva.style;

  const computedStyle = {
    text: {
      color: captionColor,
      fontSize: captionFontSize,
      fontWeight: captionFontWeight,
      lineHeight: captionLineHeight,
    },
    icon: {
      width: captionIconWidth,
      height: captionIconHeight,
      tintColor: captionIconTintColor,
    },
  };

  return (
    <View style={[tw.flexRow, tw.itemsCenter, containerStyle]}>
      {!!icon && (
        <View style={[tw.pR1, iconContainerStyle]}>
          {renderNode(Icon, icon, { style: computedStyle.icon })}
        </View>
      )}
      <Text {...textProps} style={[computedStyle.text, textStyle]} />
    </View>
  );
}

export default styled('Input')(FormHelperText);

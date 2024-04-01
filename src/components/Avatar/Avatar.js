import { styled } from '@ui-kitten/components';
import { Icon, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import renderNode from '@helpers/renderNode';

function Avatar(props) {
  const {
    eva,
    children,
    onPress,
    size,
    icon,
    iconText,
    title,
    source,
    imageProps,
    style,
    titleStyle,
    iconTextStyle,
    Component = onPress ? TouchableOpacity : View,
    ImageComponent = Image,
    ...restProps
  } = props;

  const { color, roundCoefficient, ...restStyle } = eva.style;

  const baseStyle = StyleSheet.flatten([restStyle, style]);

  const borderRadius = roundCoefficient * baseStyle.height;

  const computedStyle = {
    container: {
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      fill: color,
      width: baseStyle.width / 2,
      height: baseStyle.height / 2,
    },
    iconText: {
      color: color,
    },
    title: {
      color: color,
      fontSize: baseStyle.width / 2,
      lineHeight: baseStyle.width,
    },
  };

  const renderIcon = () => (
    <React.Fragment>
      {icon && renderNode(Icon, icon, computedStyle.icon)}
      {iconText && (
        <Text
          style={[computedStyle.iconText, tw.mT2, tw.flexShrink, iconTextStyle]}
          category="s1"
        >
          {iconText}
        </Text>
      )}
    </React.Fragment>
  );

  const renderTitle = () => (
    <Text appearance="alternative" style={[computedStyle.title, titleStyle]}>
      {title}
    </Text>
  );

  const renderImage = () => (
    <ImageComponent
      source={source}
      {...imageProps}
      style={[computedStyle.container, baseStyle]}
    />
  );

  return (
    <Component
      onPress={onPress}
      {...restProps}
      style={[computedStyle.container, baseStyle]}
    >
      {(!!icon && renderIcon()) ||
        (!!source &&
          (typeof source === 'number' || source.uri) &&
          renderImage()) ||
        (!!title && renderTitle())}
      {children}
    </Component>
  );
}

export default styled('Avatar')(Avatar);

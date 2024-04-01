import { Icon, Text } from '@ui-kitten/components';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

import makeStyles from '@helpers/makeStyles';
import renderNode from '@helpers/renderNode';

const useStyles = makeStyles({
  diamond: {
    position: 'absolute',
    width: 96,
    height: 96,
    transform: [{ rotate: '45deg' }],
    borderRadius: 4,
    backgroundColor: 'color-primary-transparent-default',
  },
  icon: {
    flexGrow: 1,
    width: 48,
    height: 48,
    tintColor: 'color-primary-default',
  },
});

export default function Empty(props) {
  const {
    icon = { name: 'archive' },
    caption,
    diamondStyle,
    containerStyle,
  } = props;

  const styles = useStyles();

  return (
    <View style={[tw.itemsCenter, tw.justifyCenter, containerStyle]}>
      <View
        style={[
          tw.flexRow,
          tw.h24,
          tw.w24,
          tw.mY8,
          tw.itemsCenter,
          tw.justifyCenter,
        ]}
      >
        <View style={[styles.diamond, diamondStyle]} />
        {renderNode(Icon, icon, styles.icon)}
      </View>
      {caption && <Text appearance="hint">{caption}</Text>}
    </View>
  );
}

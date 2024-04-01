import { Icon } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { color, tw } from 'react-native-tailwindcss';

import { Column, Row } from '@components/Stack';

import renderNode from '@helpers/renderNode';

export default function Timeline({
  data,
  orientation = 'vertical',
  lastLine = false,
  style,
  ...props
}) {
  const computedStyle = {
    icon: {
      fill: color.primary,
      width: 20,
      height: 20,
    },
  };

  const renderItem = (item, index) => {
    const lastIndex = index === data.length - 1;

    return (
      <Row key={`item-${index}`} space={2} style={style}>
        <Column style={[tw.itemsCenter]}>
          {renderIcon(item, index)}
          {(lastLine || !lastIndex) && (
            <View style={[tw.flex1, tw.wPx, tw.h4, tw.bgGray400]} />
          )}
        </Column>
        <View style={[tw.flex1, tw._mTPx]}>
          {props.renderItem(item, index)}
          {!lastIndex && <View style={tw.h2} />}
        </View>
      </Row>
    );
  };

  const renderIcon = (item, index) => {
    if (props.renderIcon) {
      return props.renderIcon(item, index);
    }
    if (props.icon) {
      return renderNode(Icon, props.icon, computedStyle.icon);
    }
    return (
      <View style={[tw.p1, tw.bgGray300, tw.roundedFull]}>
        <View style={[tw.w2, tw.h2, tw.bgPrimary, tw.roundedFull]} />
      </View>
    );
  };

  return <View>{data.map(renderItem)}</View>;
}

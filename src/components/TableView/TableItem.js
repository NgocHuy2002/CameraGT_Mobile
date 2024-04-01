import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

export default function TableItem(props) {
  const { title, description } = props;

  return (
    <View style={[tw.flexRow, tw.mT3]}>
      <Text category="p2" style={[tw.w24, tw.fontSemibold]}>
        {title}
      </Text>
      <View style={tw.w2} />
      <Text appearance="hint" category="p2" style={[tw.flex1, tw.textRight]}>
        {description}
      </Text>
    </View>
  );
}

import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

export default function MiniCard({ text, color, textColor }) {
  return (
    <View style={[tw.rounded, { backgroundColor: color }]}>
      <Text category="p2" style={[tw.pX1, tw.pYPx, { color: textColor }]}>
        {text}
      </Text>
    </View>
  );
}

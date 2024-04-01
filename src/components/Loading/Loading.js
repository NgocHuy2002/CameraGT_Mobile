import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';

const Loading = () => {
  return (
    <View
      style={[
        tw.flex1,
        tw.itemsCenter,
        tw.justifyCenter,
        { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
      ]}
    >
      <Spinner />
    </View>
  );
};

export default Loading;

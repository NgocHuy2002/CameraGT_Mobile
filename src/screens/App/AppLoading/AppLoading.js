import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import { useSelector } from 'react-redux';

import { selectLoading } from '../selectors';

export default function AppLoading(props) {
  const isLoading = useSelector(selectLoading);

  if (isLoading) {
    return (
      <View style={[tw.absolute, tw.inset0]}>
        <View style={[tw.flex1, tw.itemsCenter, tw.justifyCenter]}>
          <View
            style={[
              tw.absolute,
              tw.wFull,
              tw.hFull,
              { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
            ]}
          />
          <Spinner {...props} />
        </View>
      </View>
    );
  }
  return null;
}

import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

import { Column } from '@components/Stack';

export const ImageWithDescription = ({ uri, description }) => {
  return (
    <Column
      style={{
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        height: 145,
      }}
      space={4}
    >
      <Image
        source={{ uri: uri }}
        style={{
          width: '70%',
          height: '100%',
          alignSelf: 'center',
          resizeMode: 'cover',
        }}
      />
      <Text
        style={{
          fontSize: 10,
          fontStyle: 'italic',
          color: '#2C384A',
          textAlign: 'center',
          fontWeight: '100',
        }}
      >
        {description}
      </Text>
    </Column>
  );
};

import { Button, Card, Text } from '@ui-kitten/components';
import moment from 'moment';
import { useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

export const MapScreen = () => {
  // ------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Thông báo"
        hideLeftIcon={false}
      />
      <Content>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Card
            style={{
              margin: 10,
              width: Dimensions.get('screen').width - 20,
              height: 100,
            }}
            header={<Text>Thông báo 1</Text>}
          >
            <Text>
              Phát hiện tại camera 1 Thời gian :{' '}
              {moment().format('hh:mm DD/MM/YYYY')}
            </Text>
          </Card>
          <Card
            style={{
              margin: 10,
              width: Dimensions.get('screen').width - 20,
              height: 100,
            }}
            header={<Text>Thông báo 2</Text>}
          >
            <Text>
              Phát hiện tại camera 2 Thời gian :{' '}
              {moment().format('hh:mm DD/MM/YYYY')}
            </Text>
          </Card>
        </View>
      </Content>
    </Container>
  );
};

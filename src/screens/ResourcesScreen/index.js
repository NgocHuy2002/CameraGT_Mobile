import {
  Button,
  Card,
  Icon,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

export const ResourcesScreen = ({ route, navigation }) => {
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Danh sách bản ghi"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Card
            style={{
              width: Dimensions.get('screen').width * 0.5 - 20,
              height: 150,
              margin: 10,
            }}
          >
            <Text>Bản ghi 1</Text>
          </Card>
          <Card
            style={{
              width: Dimensions.get('screen').width * 0.5 - 20,
              height: 150,
              margin: 10,
            }}
          >
            <Text>Bản ghi 2</Text>
          </Card>
          <Card
            style={{
              width: Dimensions.get('screen').width * 0.5 - 20,
              height: 150,
              margin: 10,
            }}
          >
            <Text>Bản ghi 3</Text>
          </Card>
        </View>
      </Content>
    </Container>
  );
};

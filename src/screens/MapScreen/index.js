import { Button, Card, Text } from '@ui-kitten/components';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

import request from '@services/request';

export const MapScreen = () => {
  const [data, setData] = useState([]);
  // ------------------------------------------
  // ------------------ useEffec --------------
  useEffect(() => {
    handleGetNotification();
  }, []);
  // ------------------------------------------
  // ----------------- Action -----------------
  const handleGetNotification = async () => {
    request.get('http://192.168.0.101:5000/notification').then((res) => {
      if (res.data) {
        setData((prevData) => [
          ...prevData,
          { name: res.data.name, time: res.data.createAt },
        ]);
      }
    });
  };
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
          {data?.map((item, index) => (
            <Card
              key={index}
              style={{
                margin: 10,
                width: Dimensions.get('screen').width - 20,
                height: 100,
              }}
              header={<Text>{item.name}</Text>}
            >
              <Text>
                Phát hiện tại camera 1 Thời gian :{' '}
                {moment(item.time).format('hh:mm DD/MM/YYYY')}
              </Text>
            </Card>
          ))}
          {/* <Card
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
          </Card> */}
        </View>
      </Content>
    </Container>
  );
};

import { Text } from '@ui-kitten/components';
import { ResizeMode, Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';

import request from '@services/request';
import { socket } from '@services/socket.io';

export const DetailStream = ({ navigation, route }) => {
  const { id_camera } = route.params;
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  // ---------- useEffect --------------
  useEffect(() => {
    handleActiveStream();
  }, []);
  // ------------------------------------
  // --------- Action -------------------
  const handleActiveStream = async () => {
    await request
      .get(`http://192.168.0.101:5000/api/live/admin/${id_camera}.mp4`)
      .catch((err) => console.log(err));
  };
  // ------------------------------------
  return (
    <Container>
      <Content>
        <Video
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.3,
            resizeMode: 'contain',
            padding: 10,
          }}
          source={{
            uri: `http://192.168.0.101:5000/api/live/admin/${id_camera}/stream.m3u8`,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      </Content>
    </Container>
  );
};

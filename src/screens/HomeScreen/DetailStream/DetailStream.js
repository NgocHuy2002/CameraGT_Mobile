import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';

import { socket } from '@services/socket.io';

export const DetailStream = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  // ---------- useEffect --------------
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  // ------------------------------------
  return (
    <Container>
      <Content>
        <Image
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.3,
            resizeMode: 'contain',
            padding: 10,
          }}
        />
        <Text>Status: {isConnected ? 'connected' : 'disconnected'}</Text>
        <Text>Transport: {transport}</Text>
      </Content>
    </Container>
  );
};

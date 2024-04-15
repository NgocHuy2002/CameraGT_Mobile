import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Card,
  Icon,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';
import { ResizeMode, Video } from 'expo-av';
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

import { requestGetRecords } from '@services/RecordService/RecordService';

export const ResourcesScreen = ({ route, navigation }) => {
  //
  // State variables
  //
  const renderItem = (item, index) => (
    <Card
      key={`card_${index}`}
      style={{
        width: Dimensions.get('screen').width * 1 - 20,
        height: 300,
        margin: 10,
      }}
    >
      <Video
        source={{
          uri: item.url,
        }}
        style={{
          height: 300,
          width: '100%',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay={false}
      ></Video>
      <Text>{item.created_at}</Text>
    </Card>
  );
  const [records, setRecords] = useState([]);
  // useEffect(() => {
  //   handleRecord();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      handleRecord();
    }, []),
  );
  const handleRecord = async () => {
    const username = await AsyncStorage.getItem('USERUSERNAMEKEY');
    const data = await requestGetRecords(username);
    if (data) {
      setRecords(data);
    }
  };
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Danh sách bản ghi"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={true} safeAreaEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'column', gap: 20 }}>
          {/* {records.map((item, index) => (

          ))} */}
          <FlatList data={records} renderItem={renderItem} />
        </View>
      </Content>
    </Container>
  );
};

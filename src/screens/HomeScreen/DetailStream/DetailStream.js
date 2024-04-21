import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Text, Card, Icon } from '@ui-kitten/components';
import { Video } from 'expo-av';
import moment from 'moment';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { formatString } from '@helpers/formatString';
import { API } from '@constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePushNotification from 'src/usePushNotification';
import axios from 'axios'; // Import axios for HTTP requests
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import Orientation from 'react-native-orientation';

export const DetailStream = ({ navigation, route }) => {
  const { id_camera } = route.params;
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const [data, setData] = useState([]);
  const { expoPushToken } = usePushNotification();

  // Get username from AsyncStorage
  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('USERUSERNAMEKEY');
      return username;
    } catch (error) {
      console.error('Error getting username:', error);
      return null;
    }
  };

  // Action to activate stream
  const handleActiveStream = async () => {
    try {
      // You can add additional logic here if needed
      setIsConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Action to fetch notifications
  const handleGetNotification = async () => {
    try {
      const username = await getUsername();
      const res = await axios.get(formatString(API.Notification, expoPushToken));
      console.log(res.data);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // useEffect to run actions on component mount
  useEffect(() => {
    if (expoPushToken) {
      handleGetNotification();
    }
    handleActiveStream();
  }, [expoPushToken]);

  return (
    <Container>
      <Content>
        {/* <Video
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.3,
            padding: 10,
          }}
          source={{
            uri: formatString(API.LIVE, id_camera), // Use id_camera in API call
          }}
          useNativeControls
          resizeMode="contain"
        /> */}
        <VLCPlayer
        videoAspectRatio="16:9"
        source={{ uri: "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"}}/>
        
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          <Text style={{fontSize:20, marginLeft: 5}}>
            Thông báo mới nhất 
          </Text>
        {data? 
        data?.map((item, index) => (
          <Card
            key={index}
            style={{
              margin: 10,
              width: Dimensions.get('screen').width - 20,
              height: 100,
            }}
            header={() =>(<View style={{display:'flex', flexDirection:'row', justifyContent:"flex-start", alignItems:'center', marginLeft: 5}}>
                <Icon name="alert-circle-outline" style={{}} fill='#ff0000' width={30} height={30}/>
                <Text style={{fontSize:18, fontWeight:'bold', marginHorizontal: 10}}>{item.content}</Text>
            </View>)}>
            <Text>
              Phát hiện tại {item.name} Thời gian :{' '}
              {moment(item.time).format('hh:mm DD/MM/YYYY')}
            </Text>
          </Card>
        )):<Text>Không có dữ liệu</Text>}
      </View>
      </Content>
    </Container>
  );
};

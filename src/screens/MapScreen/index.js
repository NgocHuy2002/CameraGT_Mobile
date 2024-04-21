import { Button, Card, Text, Icon } from '@ui-kitten/components';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import usePushNotification from 'src/usePushNotification';
import request from '@services/request';
import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';
import { useFocusEffect } from '@react-navigation/native';
import { Row } from '@components/Stack';

export const MapScreen = () => {
  const [data, setData] = useState([]);
  const { expoPushToken } = usePushNotification(); // Get expoPushToken from the custom hook
  const [text, handleChangeText] = useState('');
  const handleGetNotification = async () => {
    try {
      const res = await request.get(formatString(API.Notification, expoPushToken));
      console.log(res.data);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // useFocusEffect to refresh notifications when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (expoPushToken) {
        handleGetNotification();
      }
    }, [expoPushToken])
  );

  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Thông báo"
        hideLeftIcon={false}
      />
      <View style = {{flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          padding: 10,
                          backgroundColor: '#E0E0E0',
                          marginTop:5,
                          marginHorizontal: 10,
                          height:60,
                          borderRadius:20,
                          marginVertical:20
                          }}>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{data.length}</Text>
          <Text>Số lượng thông báo</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{data.length}</Text>
          <Text>Số lượng cảnh báo</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{0}</Text>
          <Text>Thông báo khác</Text>    
        </View>
      </View>
      <View style = {{flexDirection:"row", marginLeft:0, justifyContent:'space-evenly', alignItems:'center'}}>
          <View style={{backgroundColor:'#E0E0E0', borderRadius:15, width:40, height:40, alignItems:'center', justifyContent:'center'}}>
            <Icon name="search" size={20} style={{width:30, height:30}}/>
          </View>
          <View>
            <TextInput
              style={{backgroundColor:'#E0E0E0', borderRadius:15, width: Dimensions.get('screen').width - 80, height:40,
                    paddingLeft:10  
                    }}
              placeholder="Tìm kiếm thông báo ..."
              onChangeText={handleChangeText}
              value={text}
            />
          </View>    
      </View>
      <View style = {{flexDirection:"row", marginLeft:0, justifyContent:'space-between', alignItems:'center', marginTop:15}}>
          <Text style={{fontSize:25, fontWeight: 'bold', marginHorizontal:10}}>Thông báo</Text>
          <View style={{flexDirection:'row', marginHorizontal:10, alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, borderWidth:2, borderColor: '#000', paddingHorizontal:5, borderRadius:5}}>
              <Icon name="alert-circle-outline" style={{}} fill='#000' width={30} height={30}/>
              <Text>Cảnh báo</Text>
            </View>
            <Icon name="menu-outline" style={{}} fill='#000' width={40} height={40} />
          </View>    
      </View>
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
              header={() =>(<View style={{display:'flex', flexDirection:'row', justifyContent:"flex-start", alignItems:'center', marginLeft: 5}}>
                <Icon name="alert-circle-outline" style={{}} fill='#ff0000' width={30} height={30}/>
                <Text style={{fontSize:18, fontWeight:'bold', marginHorizontal: 10}}>{item.content}</Text>
              </View>)}
            >
              <Text>
                Thời gian :{' '}
                {moment(item.created).format('hh:mm DD/MM/YYYY')}
              </Text>
            </Card>
          ))}
        </View>
      </Content>
    </Container>
  );
};

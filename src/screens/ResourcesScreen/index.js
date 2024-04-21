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
import React, { useEffect, useState, useRef  } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';

import { requestGetRecords } from '@services/RecordService/RecordService';

export const ResourcesScreen = ({ route, navigation }) => {
  //
  // State variables
  //
  const renderItem = (item, index) => {
    console.log(item)
    return (
      <Card
        key={`card_${index}`}
        style={{marginBottom:10, backgroundColor:'#E0E0E0'}}
      >
        <View style={{flexDirection:'column'}}>
        <View style={{marginBottom:5, marginTop: 5}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Icon name="alert-triangle-outline" style={{}} fill='#ffff00' width={32} height={32} />
              <View style={{justifyContent:'flex-start'}}>
                <Text style={{fontSize:15, fontWeight:'bold'}}>{item.item.content}</Text>
                <Text style ={{fontSize: 9}}>Thời gian phát hiện: {item.item.created_at}</Text>
              </View>
              <View style={{justifyContent:'flex-end'}}>
                <Icon name="more-vertical-outline" style={{}} fill='#000' width={32} height={32} />
              </View>
            </View>
          </View>
          <Video
            source={{
              uri: item.item.url,
            }}
            style={{
              height: 300,
              width: '100%',
              margin:0
            }}
            useNativeControls
            resizeMode={ResizeMode.STRETCH}
            isLooping
            shouldPlay={true}
            >
          </Video>
        </View>
    </Card>
    )
  };
  const videoRef = useRef(null);
  const playVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };
  const [records, setRecords] = useState([]);
  const [text, handleChangeText] = useState('');
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
          <Text style={{fontSize: 20}}>{records.length}</Text>
          <Text>Số lượng bản ghi</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{records.length}</Text>
          <Text>Số lượng bản ghi cảnh báo</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{0}</Text>
          <Text>Số lượng bản ghi khác</Text>    
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
              placeholder="Tìm kiếm bản ghi ..."
              onChangeText={handleChangeText}
              value={text}
            />
          </View>    
      </View>
      <View style = {{flexDirection:"row", marginLeft:0, justifyContent:'space-between', alignItems:'center', marginTop:15}}>
          <Text style={{fontSize:25, fontWeight: 'bold', marginHorizontal:10}}>Danh sách record</Text>
          <View style={{flexDirection:'row', marginHorizontal:10, alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, borderWidth:2, borderColor: '#000', paddingHorizontal:5, borderRadius:5}}>
              <Icon name="play-circle-outline" style={{}} fill='#000' width={30} height={30}/>
              <Text>Play</Text>
            </View>
            <Icon name="menu-outline" style={{}} fill='#000' width={40} height={40} />
          </View>    
      </View>
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'column', gap: 20 }}>
          {/* {records.map((item, index) => (

          ))} */}
          <FlatList data={records} renderItem={renderItem} />
        </View>
      </Content>
    </Container>
  );
};

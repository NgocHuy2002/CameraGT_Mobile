import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Card,
  CheckBox,
  Icon,
  Input,
  Modal,
  Text,
} from '@ui-kitten/components';
import { ResizeMode, Video } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, TextInput
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
// import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import { renderers } from 'react-native-popup-menu';
import io from 'socket.io-client';
import usePushNotification from 'src/usePushNotification';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';
import axios from 'axios';
import { ROUTER } from '@constants/router';

import Toast from '@modules/Toast/Toast';

import request from '@services/request';
import { socket } from '@services/socket.io';
import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';
import { map } from 'lodash';
import { height, width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const { SlideInMenu } = renderers;
export const HomeScreen = ({ navigation }) => {
  const { expoPushToken } = usePushNotification();
  const [copiedText, setCopiedText] = useState('');
  const [RTSP, setRTSP] = useState('');
  const [userNameCam, setUsernameCam] = useState('');
  const [NameCam, setnameCam] = useState('');
  const [passwordCam, setPasswordCam] = useState('');
  const [domainCam, setDomainCam] = useState('');
  const [checked, setChecked] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [text, handleChangeText] = useState('');
  const link =
    'http://192.168.0.101:5000/api/live/admin/65e96876839efe57c3b0d812';
  const [listStream, setListStream] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const actions = [
    {
      text: 'Thêm thủ công',
      icon: (
        <Icon name="camera-outline" width={18} height={18} fill={'white'} />
      ),
      name: 'bt_accessibility',
      position: 1,
    },
    {
      text: 'QR code',
      icon: <Icon pack="app" name="qr" width={18} height={18} fill={'white'} />,
      name: 'bt_language',
      position: 2,
    },
  ];
  // ------- ----- --------------------
  // ---------- useEffect --------------
  // ------------------------------------
  // --------------- Action --------------
  const fetchCameras = async () => {
    const username = await AsyncStorage.getItem('USERUSERNAMEKEY');
    try {
      const response = await axios.get(formatString(API.GETCAMERAS, username));
      if (response.data) {
        setListStream(response.data.map(item => ({ id: item.id, name: item.name })));
      }
    } catch (error) {
      console.error("Error fetching cameras:", error);
    }
  };
  
  useEffect(() => {
    fetchCameras();
    rememberToken(expoPushToken);
  }, []);
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(expoPushToken);
  };
  
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  
  const handleAddStream = async () => {
    const username = await AsyncStorage.getItem('USERUSERNAMEKEY');
    const data = {
      token_expo: expoPushToken,
      name: NameCam,
      username: userNameCam,
      password: passwordCam,
      rtsp_url: RTSP.length > 0 ? RTSP : domainCam
    };
    try {
      const response = await axios.post(formatString(API.ADDCAMERA, username), data);
      if (response) {
        fetchCameras(); // cập nhật lại danh sách camera sau khi thêm mới
      }
    } catch (error) {
      console.error("Error adding camera:", error);
    }
  };
  
  const addStream = async () => {
    await handleAddStream();
    setIsOpen(false);
    clearInput();
    Toast.showText('Thêm stream thành công');
  };
  
  const clearInput = () => {
    setUsernameCam('');
    setPasswordCam('');
    setDomainCam('');
    setRTSP('');
  };
  const rememberToken = async (values) => {
    try {
      await AsyncStorage.setItem('TOKEN', values);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  // ------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Trang chủ"
        hideLeftIcon={true}
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
          <Text style={{fontSize: 20}}>{listStream.length}</Text>
          <Text>Thiết bị đang hoạt động</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{0}</Text>
          <Text>Ngoại tuyến</Text>    
        </View>
        <Text>|</Text>
        <View style = {{flexDirection:"column", alignItems:'center'}}>
          <Text style={{fontSize: 20}}>{0}</Text>
          <Text>Thiết bị lưu trữ</Text>    
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
              placeholder="Tìm kiếm camera ..."
              onChangeText={handleChangeText}
              value={text}
            />
          </View>    
      </View>
      <View style = {{flexDirection:"row", marginLeft:0, justifyContent:'space-between', alignItems:'center', marginTop:15}}>
          <Text style={{fontSize:25, fontWeight: 'bold', marginHorizontal:10}}>Danh sách camera</Text>
          <View style={{flexDirection:'row', marginHorizontal:10, alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:10, borderWidth:2, borderColor: '#000', paddingHorizontal:5, borderRadius:5}}>
              <Icon name="play-circle-outline" style={{}} fill='#000' width={30} height={30}/>
              <Text>Play</Text>
            </View>
            <Icon name="menu-outline" style={{}} fill='#000' width={40} height={40} />
          </View>    
      </View>
      <Content scrollEnabled={true} safeAreaEnabled={true}>
        {/* <Text>Your expo token: {expoPushToken}</Text> */}
        {/* <Button onPress={copyToClipboard}>Copy</Button>
        <Input /> */}
        {listStream?.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate(ROUTER.STREAM, { id_camera: item.id })
            }
          >
            <View  style={styles.cardContainer}>
              <View style={{flexDirection:'row', height:35, width:'100%', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{marginHorizontal:10, marginBottom:2, fontSize: 18, fontWeight:'bold'}}>Camera {item.name}</Text>
                <Icon name="more-vertical-outline" style={styles.icon} fill='#000' width={32} height={32}/>
              </View>
              <View style={styles.blankView}>
                <Icon name="camera-outline" style={styles.icon} fill='#000' width={50} height={50} />
              </View>
            </View>
          </Pressable>
        ))}
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            setIsOpen(true);
          }}
        />
        <Modal
          visible={isOpen}
          backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onBackdropPress={() => setIsOpen(false)}
        >
          <Card
            style={{
              height: Dimensions.get('screen').height * 0.5,
              width: Dimensions.get('screen').width - 20,
            }}
          >
            <Column space={4}>
              {checked ? (
                <Input
                  placeholder="Nhập link rtsp"
                  key={'RTSP'}
                  label="RTSP"
                  onChangeText={(nextValue) => setRTSP(nextValue)}
                />
              ) : (
                <>
                  <Input
                    placeholder="Nhập tên camera"
                    label="Tên camera "
                    key={'Username1'}
                    onChangeText={(nextValue) => setnameCam(nextValue)}
                  />
                  <Input
                    placeholder="Nhập username camera"
                    label="Username"
                    key={'Username'}
                    onChangeText={(nextValue) => setUsernameCam(nextValue)}
                  />
                  <Input
                    placeholder="Nhập password camera"
                    key={'Password'}
                    label="Password"
                    onChangeText={(nextValue) => setPasswordCam(nextValue)}
                  />
                  <Input
                    placeholder="Nhập domain camera"
                    key={'Domain'}
                    label="Domain"
                    onChangeText={(nextValue) => setDomainCam(nextValue)}
                  />
                </>
              )}
              <CheckBox
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
              >
                Nhập link rtsp
              </CheckBox>
              <Button onPress={() => addStream()}>Thêm</Button>
            </Column>
          </Card>
        </Modal>
      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  Icon: {
    alignSelf: 'center',
  },
  blankView: {
    marginLeft:10,
    marginTop: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius:10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer:{
    marginHorizontal:10,
    backgroundColor:'#E0E0E0',
    marginTop:10,
    flexDirection:'column',
    borderRadius:10,
    padding:5
  }
});

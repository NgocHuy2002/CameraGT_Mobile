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
  View,
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

import { ROUTER } from '@constants/router';

import Toast from '@modules/Toast/Toast';

import { socket } from '@services/socket.io';

const { SlideInMenu } = renderers;
export const HomeScreen = ({ navigation }) => {
  const { expoPushToken } = usePushNotification();
  const [copiedText, setCopiedText] = useState('');
  const [RTSP, setRTSP] = useState('');
  const [userNameCam, setUsernameCam] = useState('');
  const [passwordCam, setPasswordCam] = useState('');
  const [domainCam, setDomainCam] = useState('');
  const [checked, setChecked] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const link =
    'http://192.168.0.101:5000/api/live/admin/65e96876839efe57c3b0d812';
  const [listStream, setListStream] = useState(0);
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
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(expoPushToken);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const handleAddStream = async () => {
    // API add stream sử dụng RTSP hoặc UsernameCamera + PasswordCamera + DomainCamera
    // return data or mess
  };

  const addStream = async () => {
    // setListStream([...listStream, value]);
    await handleAddStream();
    console.log(userNameCam + passwordCam + domainCam);
    setListStream(listStream + 1);
    setIsOpen(false);
    Toast.showText('Thêm stream thành công');
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
      <Content scrollEnabled={true} safeAreaEnabled={true}>
        {/* <Text>Your expo token: {expoPushToken}</Text> */}
        {/* <Button onPress={copyToClipboard}>Copy</Button>
        <Input /> */}
        {[...Array(listStream)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(ROUTER.STREAM)}
          >
            <View style={styles.blankView}>
              <Text
                style={{ color: 'white', fontSize: 16 }}
              >{`Stream Camera ${index + 1}`}</Text>
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
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

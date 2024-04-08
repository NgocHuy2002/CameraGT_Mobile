import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Icon, Input, Modal, Text } from '@ui-kitten/components';
import { ResizeMode, Video } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
// import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import { renderers } from 'react-native-popup-menu';
import usePushNotification from 'src/usePushNotification';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';

const { SlideInMenu } = renderers;

export const HomeScreen = ({ navigation }) => {
  const { expoPushToken } = usePushNotification();
  const [copiedText, setCopiedText] = useState('');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const link = 'http://192.168.0.101:5000/api/live/admin/65e96876839efe57c3b0d812';
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
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(expoPushToken);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  const addStream = (value) => {
    setListStream([...listStream, value]);
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
        {listStream.length < 1 ? (
          <View style={styles.blankView}>
            <Icon
              style={styles.Icon}
              name={'plus-circle-outline'}
              width={50}
              height={50}
              fill={'white'}
            />
          </View>
        ) : (
          listStream.map((link, index) => {
            return (
              <View key={index}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    marginTop: 5,
                    fontSize: 20,
                    fontWeight: '800',
                  }}
                >
                  Camera {index + 1}
                </Text>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: link,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  shouldPlay={true}
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                {/* <Image source={{
                  uri: link,
                }} style={{ height: 300, width: Dimensions.get('screen').width * 1 - 20 }} /> */}
              </View>
            );
          })
        )}
        <View style={styles.buttons}>
          <Button
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            {status.isPlaying ? 'Pause' : 'Play'}
          </Button>
        </View>
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
              height: Dimensions.get('screen').height * 0.3,
              width: Dimensions.get('screen').width - 20,
            }}
          >
            <Column space={4}>
              <Input placeholder="Nhập link rtsp" label="RTSP" value={link} />
              <Button onPress={() => addStream(link)}>Thêm</Button>
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

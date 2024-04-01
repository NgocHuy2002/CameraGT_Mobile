import { useFocusEffect } from '@react-navigation/native';
import {
  Avatar,
  Button,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import { useDispatch, useSelector } from 'react-redux';

import ArrowDown from '@assets/icons/arrow-down.svg';
import ArrowRight from '@assets/icons/arrow-right-rourd.svg';
import BookIcon from '@assets/icons/book.svg';
import PhoneIcon from '@assets/icons/contact.svg';
import EarthIcon from '@assets/icons/earth.svg';
import GlobalIcon from '@assets/icons/global.svg';
import HomeIcon from '@assets/icons/home_color.svg';
import InfoIcon from '@assets/icons/info_color.svg';
import NewsPaperIcon from '@assets/icons/newspaper.svg';
import LockIcon from '@assets/icons/padlock.svg';
import SettingIcon from '@assets/icons/setting_color.svg';
import User from '@assets/icons/user_2.svg';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { SmallCard } from '@components/SmallCard/SmallCard';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import { userLogoutRoutine } from '@containers/Auth/saga/routines';
import { selectUser } from '@containers/Auth/saga/selectors';

import { formatString } from '@helpers/formatString';

import { requestGetUserInfo } from '@services/UserService/UserService';

export default function MenuScreen({ navigation }) {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const menuData = [
    { icon: <HomeIcon />, title: 'Trang chủ', event: ROUTER.HOME },
    { icon: <InfoIcon />, title: 'Giới thiệu', event: ROUTER.ABOUT },
    { icon: <PhoneIcon />, title: 'Liên hệ', event: ROUTER.CONTACT },
    { icon: <SettingIcon />, title: 'Tài nguyên', event: ROUTER.RESOURCES },
    { icon: <EarthIcon />, title: 'Bản đồ', event: ROUTER.MAP },
    { icon: <NewsPaperIcon />, title: 'Bài viết', event: ROUTER.POSTS },
    { icon: <BookIcon />, title: 'Hướng dẫn kết nối', event: ROUTER.GUIDE },
  ];
  const renderToggleButton = () => (
    <>{!visible ? <ArrowRight /> : <ArrowDown />}</>
  );
  const AvatarImageComponentShowcase = () => (
    <Avatar
      source={
        user?.avatarImageUrl
          ? { uri: formatString(API.GET_IMAGE, user.avatarImageUrl) }
          : require('../../assets/images/logo.png')
      }
      ImageComponent={ImageBackground}
    />
  );
  // ------------ useEffect -------------
  useFocusEffect(
    React.useCallback(() => {
      handleGetUserInfo();
    }, []),
  );
  // ------------------------------------
  //   ---------- Action ----------------
  const handleGetUserInfo = async () => {
    const data = await requestGetUserInfo();
    setUser(data);
  };
  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch(userLogoutRoutine.trigger());
  };
  return (
    <Container>
      <Header
        // status='primary'
        color="#286FC3"
        title="Menu"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <View style={{ margin: 15, flex: 1, justifyContent: 'space-between' }}>
          <View>
            <Menu
              onSelect={() => setVisible(!visible)}
              style={{
                borderRadius: 5,
                borderColor: '#00000040',
                borderWidth: 1,
                borderBottomWidth: 2,
              }}
            >
              <MenuGroup
                title={() => (
                  <Text
                    style={{
                      color: '#286FC3',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {user?.fullName || user?.userName}
                  </Text>
                )}
                style={{
                  borderRadius: 5,
                  borderBottomWidth: visible ? 1 : 0,
                  borderColor: '#00000040',
                }}
                accessoryLeft={AvatarImageComponentShowcase}
                accessoryRight={renderToggleButton}
              >
                <MenuItem
                  title="Thông tin cá nhân và tài khoản"
                  accessoryLeft={<User />}
                  onPress={() =>
                    navigation.navigate(ROUTER.USER_INFO, { user: user })
                  }
                />
                <MenuItem
                  title="Đổi mật khẩu"
                  accessoryLeft={<LockIcon />}
                  onPress={() =>
                    navigation.navigate(ROUTER.CHANGE_OLD_PASSWORD)
                  }
                />
                <MenuItem
                  title="Ngôn ngữ ứng dụng"
                  accessoryLeft={<GlobalIcon />}
                  onPress={() => navigation.navigate(ROUTER.CHANGE_LAUGUAGE)}
                  style={{
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                />
              </MenuGroup>
            </Menu>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 20,
                marginTop: 15,
              }}
            >
              {menuData.map((item) => (
                <SmallCard
                  Icon={item.icon}
                  title={item.title}
                  key={item.title}
                  event={() => navigation.navigate(item.event)}
                />
              ))}
            </View>
          </View>
          <View>
            <Button
              appearance="outline"
              size="tiny"
              status="basic"
              style={{ borderRadius: 50 }}
              onPress={handleLogout}
            >
              Đăng xuất
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
}

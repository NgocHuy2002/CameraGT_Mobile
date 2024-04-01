import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Icon, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import Menu, { MenuDivider, MenuItem } from "react-native-material-menu";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { renderers } from 'react-native-popup-menu';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { tw } from 'react-native-tailwindcss';
import { useDispatch, useSelector } from 'react-redux';

import EnviromentIcon from '@assets/icons/enviroment.svg';
import InfoIcon from '@assets/icons/info.svg';
import NoiVuIcon from '@assets/icons/noi_vu.svg';
import NgongNghiepIcon from '@assets/icons/nong_nghiep.svg';
import TrafficIcon from '@assets/icons/traffic.svg';
import XayDungIcon from '@assets/icons/xay_dung.svg';

import { BottomNavigationCustom } from '@components/BottomTabs';
import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import { selectToken } from '@containers/Auth/saga/selectors';

import { formatString } from '@helpers/formatString';

import {
  getFlatLinhVucApi,
  getHottestPostsApi,
  getLatestPostsApi,
  getLinhVucApi,
} from '@services/PostsService/PostsService';
import request from '@services/request';

import {
  getHottestPostsRoutine,
  getLatestPostsRoutine,
  getLinhVucRoutine,
} from './saga/routines';
import { selectPosts } from './saga/selectors';

// import Modal from "@components/Modal/Modal";
const { SlideInMenu } = renderers;

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [latest, setLatest] = useState([]);
  const [hottest, setHottest] = useState([]);
  const [linhVuc, setLinhVuc] = useState([]);
  const [paginationNew, setPaginationNew] = useState(0);
  const [paginationHot, setPaginationHot] = useState(0);
  const screenWidth = Dimensions.get('screen').width;
  const result = Dimensions.get('screen').width * 0.8;
  const [visible, setVisible] = useState(false);

  const renderIcon = (props) => <Icon {...props} name={'grid'} />;
  // ------- Render --------------------
  const truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  };

  const renderCard = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(ROUTER.POST, { id: item.id })}
    >
      <View
        style={{
          borderRadius: 5,
          width: result,
          height: result - 20,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            width: '100%',
            height: (result / 4) * 3,
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <Image
            source={
              item.imageLink
                ? { uri: formatString(API.GET_IMAGE, item.imageLink) }
                : require('@assets/images/product-no-image.png')
            }
            style={{
              resizeMode: 'cover',
              width: result,
              height: (result / 4) * 3,
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'justify',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: 50,
            paddingTop: 5,
          }}
        >
          {truncateString(item.tieude, 85)}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const Item = ({ title, icon, id }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ROUTER.FIELD, { title: title, id_nganh: id })
      }
    >
      <View
        style={{
          width: 70,
          height: 80,
          flex: 1,
          alignItems: 'center',
          marginRight: 5,
        }}
      >
        {/* {icon} */}
        <Image
          source={
            icon
              ? { uri: formatString(API.GET_IMAGE, icon) }
              : require('@assets/images/product-no-image.png')
          }
          style={{ resizeMode: 'cover', width: 40, height: 40 }}
        />
        <Text
          style={{
            fontSize: 10,
            marginTop: 5,
            textAlign: 'center',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  function PaginationView(props) {
    const { items, activeSlide } = props;
    return (
      <View>
        <Pagination
          dotsLength={items?.length || 1}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: 'transparent',
            paddingVertical: 0,
            paddingBottom: 10,
          }}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
          }}
          dotColor="#286FC3"
          inactiveDotColor="#757575"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }
  const renderMenu = ({ items }) => {
    const itemWidth = screenWidth / 4;
    return items.map((item) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTER.FIELD, {
              title: item.name,
              id_nganh: item.id,
            })
          }
          key={item.id}
        >
          <View
            style={{
              width: itemWidth,
              height: 80,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                item.imgLink
                  ? { uri: formatString(API.GET_IMAGE, item.imgLink) }
                  : require('@assets/images/product-no-image.png')
              }
              style={{ resizeMode: 'cover', width: 50, height: 50 }}
            />
            <Text style={{ fontSize: 10, marginTop: 5, textAlign: 'center' }}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  // ------- ----- --------------------
  // ---------- useEffect --------------
  useEffect(() => {
    // dispatch(getLinhVucRoutine.trigger())
    // dispatch(getLatestPostsRoutine.trigger())
    // dispatch(getHottestPostsRoutine.trigger())

    handleCallLinhVucApi('C_LINHVUC', 1, 10);
    handleCallLatestPostsApi();
    handleCallHottestPostsApi();
  }, []);
  // ------------------------------------
  // --------------- Action --------------
  const handleCallLinhVucApi = async (type, page, size) => {
    const data = await getLinhVucApi(type, page, size);
    setLinhVuc(data);
  };
  const handleCallLatestPostsApi = async () => {
    const data = await getLatestPostsApi();
    setLatest(data);
  };
  const handleCallHottestPostsApi = async () => {
    const data = await getHottestPostsApi();
    setHottest(data);
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
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}
            >
              Ngành
            </Text>
            <Button
              appearance="ghost"
              accessoryLeft={renderIcon}
              onPress={() => setVisible(true)}
            >
              Xem tất cả
            </Button>
          </View>
          <View style={{ alignItems: 'center', paddingLeft: 20 }}>
            <FlatList
              horizontal={true}
              data={linhVuc}
              renderItem={({ item }) => (
                <Item title={item?.name} icon={item?.imgLink} id={item?.id} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}
            >
              Bài viết mới nhất
            </Text>
            <Button
              appearance="ghost"
              accessoryLeft={renderIcon}
              onPress={() =>
                navigation.navigate(ROUTER.FIELD, {
                  title: 'Bài viết mới nhất',
                  data: latest,
                  id_nganh: null,
                })
              }
            >
              Xem tất cả
            </Button>
          </View>
          {latest ? (
            <View>
              <Carousel
                data={latest?.slice(0, 5) || null}
                renderItem={renderCard || null}
                layout={'default'}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width - 40}
                autoplayDelay={2000}
                inactiveSlideScale={1}
                inactiveSlideShift={0}
                loop={true}
                autoplayInterval={3000}
                scrollEnabled={true}
                useScrollView={true}
                onSnapToItem={(index) => setPaginationNew(index)}
              />
              <PaginationView
                items={latest?.slice(0, 5) || null}
                activeSlide={paginationNew}
              />
            </View>
          ) : (
            <Text style={{ alignSelf: 'center' }}>Không có bài viết</Text>
          )}
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}
            >
              Bài viết nổi bật
            </Text>
            <Button
              appearance="ghost"
              accessoryLeft={renderIcon}
              onPress={() =>
                navigation.navigate(ROUTER.FIELD, {
                  title: 'Bài viết nổi bật',
                  data: hottest,
                  id_nganh: null,
                })
              }
            >
              Xem tất cả
            </Button>
          </View>
          {hottest ? (
            <View style={{ alignItems: 'center' }}>
              <Carousel
                data={hottest?.slice(0, 5)}
                renderItem={renderCard}
                loop={true}
                layout={'default'}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width - 40}
                autoplayDelay={2000}
                autoplayInterval={3000}
                scrollEnabled={true}
                inactiveSlideScale={1}
                inactiveSlideShift={0}
                useScrollView={true}
                onSnapToItem={(index) => setPaginationHot(index)}
              />
              <PaginationView
                items={hottest?.slice(0, 5) || null}
                activeSlide={paginationHot}
              />
            </View>
          ) : (
            <Text style={{ alignSelf: 'center' }}>Không có bài viết</Text>
          )}
        </View>
        <Modal visible={visible} transparent={true} animationType="slide">
          <View style={{ flex: 1, zIndex: 100 }}>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  height: '65%',
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
            <Card
              disabled={true}
              style={{
                position: 'absolute',
                top: '60%',
                height: '40%',
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}
              >
                Ngành
              </Text>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 20,
                }}
              >
                {renderMenu({ items: linhVuc })}
              </ScrollView>
            </Card>
          </View>
        </Modal>
      </Content>
    </Container>
  );
};

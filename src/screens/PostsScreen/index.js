import { Button, Icon, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { tw } from 'react-native-tailwindcss';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { PaginationCustom } from '@components/Pagination/Pagination';

import { API } from '@constants/api';
import { APP_CODE, SITE_ID } from '@constants/app';
import { ROUTER } from '@constants/router';

import { formatString } from '@helpers/formatString';

import { getBaiVietTheoChuyenMucApi } from '@services/PostsService/PostsService';
import request from '@services/request';

export const PostsScreen = ({ navigation, route }) => {
  const [listChuyenMuc, setListChuyenMuc] = useState();
  const [baiVietChuyenMuc, setBaiVietChuyenMuc] = useState();
  const [paginationStates, setPaginationStates] = useState(
    Array(listChuyenMuc?.length).fill(0),
  );
  const viewWidth = Dimensions.get('screen').width * 0.8;
  // ------- Render --------------------
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  };

  const renderIcon = (props) => <Icon {...props} name={'grid'} />;
  const renderCard = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(ROUTER.POST, { id: item.id })}
      >
        <View
          style={{
            borderRadius: 5,
            width: viewWidth,
            height: viewWidth - 30,
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          key={item.id}
        >
          <View
            style={{
              width: '100%',
              height: (viewWidth / 4) * 3,
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
              style={{ resizeMode: 'cover', width: viewWidth, height: '100%' }}
            />
          </View>
          <Text
            style={{
              height: 50,
              textAlign: 'justify',
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {truncateString(item.tieude, 85)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const setPaginationState = (index, value) => {
    const newPaginationStates = [...paginationStates];
    newPaginationStates[index] = value;
    setPaginationStates(newPaginationStates);
  };
  //  ----------------- useEffect ------------------
  useEffect(() => {
    // handleGetListChuyenMuc()
    handleGetBaiVietChuyenMuc(3);
  }, []);
  // -----------------------------------------------
  // ----------------- Action ----------------------
  const handleGetListChuyenMuc = () => {
    request
      .get(API.GET_LIST_CHUYEN_MUC, { params: { PageNumber: 1 } })
      .then((response) => {
        if (response.data) {
          setListChuyenMuc(response.data.items);
          return response.data;
        }
        return null;
      })
      .catch((error) => console.log(error));
  };
  const handleGetBaiVietChuyenMuc = async (size) => {
    const data = await getBaiVietTheoChuyenMucApi(size);
    setBaiVietChuyenMuc(data);
  };
  const handleShowAllPosts = ({ title, id }) => {
    navigation.navigate(ROUTER.POSTS_BY_CATEGORY, {
      title: title,
      chuyen_muc_id: id,
    });
  };
  // ---------------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Bài viết"
        hideLeftIcon={false}
      />
      <Content>
        {baiVietChuyenMuc?.map((chuyen_muc, index) => {
          return (
            <View key={chuyen_muc + '_' + index}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {truncateString(chuyen_muc.tenChuyenMuc, 25)}
                </Text>
                <Button
                  appearance="ghost"
                  accessoryLeft={renderIcon}
                  onPress={() =>
                    handleShowAllPosts({
                      title: chuyen_muc.tenChuyenMuc,
                      id: chuyen_muc.id,
                    })
                  }
                >
                  Xem tất cả
                </Button>
              </View>
              {!chuyen_muc.listTinBai?.length < 1 ? (
                <View>
                  <Carousel
                    data={chuyen_muc.listTinBai}
                    renderItem={renderCard}
                    layout={'default'}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width - 40}
                    autoplayDelay={2000}
                    autoplayInterval={3000}
                    scrollEnabled={true}
                    loop={true}
                    inactiveSlideScale={1}
                    inactiveSlideShift={0}
                    useScrollView={true}
                    onSnapToItem={(itemIndex) =>
                      setPaginationState(index, itemIndex)
                    }
                  />
                  <PaginationCustom
                    items={chuyen_muc.listTinBai}
                    activeSlide={paginationStates[index]}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    height: Dimensions.get('screen').height * 0.2,
                    paddingVertical: '15%',
                  }}
                >
                  Chưa có bài viết
                </Text>
              )}
            </View>
          );
        })}
      </Content>
    </Container>
  );
};

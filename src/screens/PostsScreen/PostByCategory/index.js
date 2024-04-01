import { useIsFocused } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { tw } from 'react-native-tailwindcss';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import ProList from '@components/ProList/ProList';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import { formatString } from '@helpers/formatString';

import {
  getBaiVietTheoChuyenMucApi,
  getBaiVietTheoChuyenMucIdApi,
} from '@services/PostsService/PostsService';
import request from '@services/request';

export const PostByCategory = ({ navigation, route }) => {
  const { title, chuyen_muc_id } = route.params;
  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('screen').width * 0.5 - 20;
  const numberCol = 2;
  const [data, setData] = useState();

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
    }
    return str;
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(ROUTER.POST, { id: item.id })}
      >
        <View
          style={{
            borderRadius: 15,
            width: screenWidth,
            height: screenWidth,
            margin: 10,
          }}
        >
          <View
            style={{
              width: '100%',
              height: (screenWidth / 4) * 3,
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
                width: screenWidth,
                resizeMode: 'cover',
                height: (screenWidth / 4) * 3,
              }}
            />
          </View>
          <Text
            style={{ width: screenWidth, height: 50, textAlign: 'justify' }}
          >
            {truncateString(item.tieude, 75)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const formatData = (data, numCol) => {
    const numberOfFullRows = Math.floor(data.lenght / numCol);

    let numberOfElementsLastRow = data.lenght - { numberOfFullRows };

    while (numberOfElementsLastRow != numCol && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
  };

  const filterParams = useMemo(() => {
    const params = {};
    // if (formValues.name) params['name[like]'] = formValues.name;
    // if (formValues.code) params['code[like]'] = formValues.code;
    // if (formValues.procedure) params.procedure = formValues.procedure;
    return params;
  }, []);
  // ------------------ useEffect ---------------------------
  useEffect(() => {
    handleGetBaiViet();
  }, []);
  // --------------------------------------------------------
  // ------------------ Action ------------------------------
  const handleGetBaiViet = async (page, limit, params) => {
    const data = await getBaiVietTheoChuyenMucIdApi(
      chuyen_muc_id,
      page,
      limit,
      params,
    );
    if (data) {
      return { data };
    }
    return null;
  };
  // --------------------------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title={title}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <ProList
            params={filterParams}
            request={handleGetBaiViet}
            reloadDeps={[isFocused]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={tw.h4} />}
            // contentContainerStyle={tw.p4}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Content>
    </Container>
  );
};

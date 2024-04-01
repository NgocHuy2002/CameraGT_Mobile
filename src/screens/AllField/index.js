import { useIsFocused } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import ProList from '@components/ProList/ProList';

import { ROUTER } from '@constants/router';

import { getLinhVucApi } from '@services/PostsService/PostsService';

export const Field = ({ navigation, route }) => {
  const { title, data, id_nganh } = route.params;
  const isFocused = useIsFocused();
  const [nganh, setNganh] = useState();
  const screenWidth = Dimensions.get('screen').width * 0.5 - 20;
  const numberCol = 2;

  const truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength - 3) + '...';
    }
    return str;
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleNavigationToPost(item)}>
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
              style={{ width: screenWidth, height: (screenWidth / 4) * 3 }}
            />
          </View>
          <Text
            style={{
              width: screenWidth,
              height: screenWidth * 0.3,
              textAlign: 'justify',
            }}
          >
            {truncateString(item.tieude, 50) ||
              truncateString(item.metaKey, 50)}
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
  // ------------- useEffect -----------------
  useEffect(() => {
    if (id_nganh) {
      handleCallLinhVucApi('C_LINHVUC', 1, 10);
    }
  }, []);
  // -----------------------------------------
  // --------------- Action -------------------
  const handleCallLinhVucApi = async (type, page, size) => {
    const data = await getLinhVucApi(type, page, size);
    setNganh(data.filter((x) => x.id == id_nganh));
  };

  const handleNavigationToPost = (item) => {
    if (id_nganh) {
      navigation.navigate(ROUTER.POST, { id: null, data: item.metaValue });
    } else {
      navigation.navigate(ROUTER.POST, { id: item.id });
    }
  };
  // ------------------------------------------
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
        {/* <ProList
          params={filterParams}
          request={onRequest}
          reloadDeps={[isFocused]}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={tw.h4} />}
          contentContainerStyle={tw.p4}
        /> */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <FlatList
            data={id_nganh ? nganh : data}
            renderItem={renderItem}
            numColumns={numberCol}
            keyExtractor={(item) => (id_nganh ? item.metaKey : item.id)}
          />
        </View>
      </Content>
    </Container>
  );
};

import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import EnviromentIcon from '@assets/icons/enviroment.svg';
import InfoIcon from '@assets/icons/info.svg';
import NoiVuIcon from '@assets/icons/noi_vu.svg';
import NgongNghiepIcon from '@assets/icons/nong_nghiep.svg';
import TrafficIcon from '@assets/icons/traffic.svg';
import XayDungIcon from '@assets/icons/xay_dung.svg';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import Header from '@components/Header/Header';
import { Row } from '@components/Stack';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import { formatString } from '@helpers/formatString';

import { getLinhVucApi } from '@services/PostsService/PostsService';

export const ResourcesScreen = ({ route, navigation }) => {
  const numCol = 2;
  const [nganh, setNganh] = useState([]);

  // ----------- Render --------------------
  const ItemAccessory = (props) => {
    return (
      <Row style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 31,
            height: 28,
            backgroundColor: '#ECEFF1',
            borderRadius: 13,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: '#286FC3', fontWeight: 'bold' }}>
            {props.number}
          </Text>
        </View>
        <Icon
          name={'arrow-forward-outline'}
          width={25}
          height={20}
          fill={'#286FC3'}
        />
      </Row>
    );
  };
  const Item = ({ title, icon, id }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTER.RESOURCES_BY, { id_nganh: id })}
      style={{ flex: 1, marginTop: 15 }}
    >
      <View style={{ flex: 1, alignItems: 'center', marginRight: 5, gap: 10 }}>
        <Image
          source={
            icon
              ? { uri: formatString(API.GET_IMAGE, icon) }
              : require('@assets/images/product-no-image.png')
          }
          style={{ resizeMode: 'cover', width: 100, height: 100 }}
        />
        <Text
          style={{
            fontSize: 15,
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
  // ---------------------------------------
  // ---------- useEffect --------------
  useEffect(() => {
    handleCallLinhVucApi('C_LINHVUC', 1, 10);
  }, []);
  // ------------------------------------
  // --------------- Action --------------
  const handleCallLinhVucApi = async (type, page, size) => {
    const data = await getLinhVucApi(type, page, size);
    setNganh(data);
  };
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Tài nguyên"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <View style={{ flex: 1 }}>
          <FlatList
            horizontal={false}
            data={nganh}
            numColumns={numCol}
            renderItem={({ item }) => (
              <Item title={item.name} icon={item.imgLink} id={item.id} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Content>
    </Container>
  );
};

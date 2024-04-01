import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

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

import { ROUTER } from '@constants/router';

import { getKhoByLinhVucApi } from '@services/KhoService/KhoService';

export const ResourcesByScreen = ({ route, navigation }) => {
  const { id_nganh } = route.params;
  const [kho, setKho] = useState();

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
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item?.tenKho}
      accessoryRight={<ItemAccessory number={item?.soLuongDoiTuong || 0} />}
      style={{
        borderBottomWidth: 1,
        borderColor: '#CDD3D9',
        backgroundColor: 'transparent',
      }}
      onPress={() =>
        navigation.navigate(ROUTER.RESOURCES_DETAIL, {
          title: item.tenKho,
          id: item.id,
        })
      }
    />
  );
  // ---------------------------------------
  // ------------- useEffect -------------
  useEffect(() => {
    if (id_nganh) {
      handleGetResourcesBy(id_nganh, 1, 10);
    }
  }, []);
  // -------------------------------------
  // ------------- Action ----------------
  const handleGetResourcesBy = async (id, page, size) => {
    const data = await getKhoByLinhVucApi(id, page, size);
    setKho(data.items);
  };
  // -------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Danh sách kho"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        {kho?.length < 1 ? (
          <Text style={{ paddingTop: 20, alignSelf: 'center' }}>
            Danh sách kho trống
          </Text>
        ) : (
          <List
            style={{ paddingHorizontal: 15 }}
            data={kho}
            renderItem={renderItem}
          />
        )}
      </Content>
    </Container>
  );
};

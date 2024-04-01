import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
  Card,
  Icon,
  Input,
  List,
  ListItem,
  Modal,
  Text,
} from '@ui-kitten/components';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { tw } from 'react-native-tailwindcss';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import FormikInput from '@components/FormInput/FormikInput';
import FormikSelect from '@components/FormSelect/FormikSelect';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';

import { ROUTER } from '@constants/router';

export const ResourcesList = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  // const { title } = route.params;
  const data = new Array(8).fill({
    title: 'Dữ liệu ',
    number: 123,
    seen: 30,
    download: 30,
  });

  const formValues = {
    truong_du_lieu: '',
    dieu_kien: '',
    tu_khoa: '',
    linh_vuc: '',
    kho_du_lieu: '',
  };
  // ----------- Render --------------------
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(ROUTER.DATA_DETAIL)}>
        <Row
          space={4}
          style={{
            height: 77,
            borderTopWidth: 1,
            borderColor: '#E8E8E8',
            alignItems: 'center',
            borderBottomWidth: index == data.length - 1 ? 1 : 0,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
        >
          <Row space={4}>
            <Image
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#CDD3D9',
                borderRadius: 8,
              }}
            />
            <Column>
              <Text
                style={{ fontSize: 16, fontWeight: 'bold' }}
              >{`${item.title} ${index + 1}`}</Text>
              <Row space={1} style={{ alignItems: 'center' }}>
                <Text
                  style={{ color: '#286FC3', fontSize: 14, fontWeight: '700' }}
                >{`${item.number}`}</Text>
                <Text>kho</Text>
              </Row>
            </Column>
          </Row>
          <View>
            <Row style={{ alignSelf: 'center' }} space={2}>
              <Row style={{ alignItems: 'center' }} space={1}>
                <MaterialCommunityIcons
                  name="eye-outline"
                  size={12}
                  color="#2C384A"
                />
                <Text style={{ fontSize: 12, fontWeight: '400' }}>
                  {item.seen}
                </Text>
              </Row>
              <Row style={{ alignItems: 'center' }} space={1}>
                <AntDesign name="download" size={12} color="#2C384A" />
                <Text style={{ fontSize: 12, fontWeight: '400' }}>
                  {item.download}
                </Text>
              </Row>
            </Row>
          </View>
        </Row>
      </TouchableOpacity>
    );
  };

  const renderSearchIcon = () => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 1000,
          backgroundColor: '#F7F7F7',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name={'search-outline'} width={20} height={20} fill={'#286FC3'} />
      </View>
    );
  };
  const renderFunnelIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <Icon name={'funnel-outline'} width={20} height={20} fill={'#286FC3'} />
      </TouchableWithoutFeedback>
    );
  };

  const renderForm = (formik) => (
    <Column space={4} style={[{ flex: 1 }]}>
      <Column space={2} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikSelect
            name="truong_du_lieu"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
            ]}
            placeholder={'Chọn trường siêu dữ liệu'}
          />
          <FormikSelect
            name="dieu_kien"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            uniqueKey="value"
            size={'large'}
            displayKey="label"
            options={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
            ]}
            placeholder={'Chọn điều kiện tìm kiếm'}
          />
          <FormikSelect
            name="tu_khoa"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
            ]}
            placeholder={'Chọn từ khoá'}
          />
          <FormikSelect
            name="linh_vuc"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
            ]}
            placeholder={'Chọn lĩnh vực'}
          />
          <FormikSelect
            name="kho_du_lieu"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 0, label: '1' },
              { value: 1, label: '2' },
            ]}
            placeholder={'Chọn kho dữ liệu'}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            size="tiny"
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 106, height: 28 }}
            accessoryLeft={
              <Icon name={'search-outline'} width={15} height={15} />
            }
          >
            Tìm kiếm
          </Button>
        </View>
      </Column>
    </Column>
  );
  // ---------------------------------------
  // --------------Action----------------
  const onFormSubmit = (values) => {
    console.log(values);
  };
  // ---------------------------------------

  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Danh sách dữ liệu"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Input
          placeholder="Nhập từ khoá tìm kiếm"
          accessoryLeft={renderSearchIcon}
          accessoryRight={renderFunnelIcon}
          onSubmitEditing={() => console.log('test')}
          style={{ margin: 15, borderRadius: 5 }}
        />

        <List
          style={{ paddingHorizontal: 15, backgroundColor: 'transparent' }}
          data={data}
          renderItem={renderItem}
        />
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onBackdropPress={() => setVisible(false)}
          animationType={'slide'}
          shouldUseContainer={true}
          hardwareAccelerated={true}
          style={{
            width: '100%',
            position: 'absolute',
            top: '53%',
            height: '47%',
          }}
        >
          <Card
            style={{
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              height: '100%',
            }}
          >
            <ScrollView>
              <Formik initialValues={formValues} onSubmit={onFormSubmit}>
                {renderForm}
              </Formik>
            </ScrollView>
          </Card>
        </Modal>
      </Content>
    </Container>
  );
};

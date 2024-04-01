import { Button, Icon, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import FormikInput from '@components/FormInput/FormikInput';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';

import { API } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export const ContactScreen = () => {
  const [data, setData] = useState();
  const formValues = {
    comment: '',
  };
  const noSpacesValidation = Yup.string()
    .required('Thông tin này không được bỏ trống')
    .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
      return value !== null && value !== undefined && value.trim() !== '';
    });

  const Schema = Yup.object().shape({
    comment: noSpacesValidation,
  });

  const comments = [
    {
      comment:
        'Cựu tổng thống Donald Trump đang dẫn đầu đường đua tranh đề cử của đảng Cộng hòa với hai chiến thắng đầu tiên trong vòng sơ bộ ở bang Iowa và New Hampshire. Cựu thống đốc Nam Carolina Nikki Haley được đánh giá khó có khả năng chiến thắng, khi tầm ảnh hưởng của ông Trump trong đảng Cộng hòa còn quá lớn.',
      date: '',
      key: 2,
      status: 1,
    },
    {
      comment:
        'Cựu tổng thống Donald Trump đang dẫn đầu đường đua tranh đề cử của đảng Cộng hòa với hai chiến thắng đầu tiên trong vòng sơ bộ ở bang Iowa và New Hampshire. Cựu thống đốc Nam Carolina Nikki Haley được đánh giá khó có khả năng chiến thắng, khi tầm ảnh hưởng của ông Trump trong đảng Cộng hòa còn quá lớn.',
      date: '',
      key: 3,
      status: 0,
    },
    {
      comment:
        'Cựu tổng thống Donald Trump đang dẫn đầu đường đua tranh đề cử của đảng Cộng hòa với hai chiến thắng đầu tiên trong vòng sơ bộ ở bang Iowa và New Hampshire. Cựu thống đốc Nam Carolina Nikki Haley được đánh giá khó có khả năng chiến thắng, khi tầm ảnh hưởng của ông Trump trong đảng Cộng hòa còn quá lớn.',
      date: '',
      key: 4,
      status: 1,
    },
    {
      comment:
        'Cựu tổng thống Donald Trump đang dẫn đầu đường đua tranh đề cử của đảng Cộng hòa với hai chiến thắng đầu tiên trong vòng sơ bộ ở bang Iowa và New Hampshire. Cựu thống đốc Nam Carolina Nikki Haley được đánh giá khó có khả năng chiến thắng, khi tầm ảnh hưởng của ông Trump trong đảng Cộng hòa còn quá lớn.',
      date: '',
      key: 5,
      status: 1,
    },
  ];
  const showToast = (mess) => {
    Toast.show({
      type: 'success',
      text1: mess,
    });
  };
  /*
    1. Create the config
  */
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#57BF99' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  // ----------------- render ----------------------
  const renderForm = (formik) => (
    <View style={{ padding: 10 }}>
      <FormikInput
        name="comment"
        variant="outlined"
        size="large"
        containerStyle={tw.mB4}
        textStyle={{ height: 106 }}
        multiline={true}
        numberOfLines={5}
        onSubmitEditing={formik.handleSubmit}
        placeholder="Nhập nội dung thông tin cần liên hệ"
      />
      <Button
        onPress={formik.handleSubmit}
        accessoryLeft={<Icon name={'paper-plane-outline'} />}
        style={{ width: 100, alignSelf: 'center' }}
        size="tiny"
      >
        Gửi
      </Button>
    </View>
  );
  const Item = ({ items }) => (
    <Column space={2} style={[tw.mB4]}>
      <Row space={4} style={{ alignItems: 'center' }}>
        <Icon name={'calendar-outline'} width={12} height={12} />
        <Text style={{ fontSize: 10, textAlign: 'center' }}>
          {moment(items.thoidiemgui).format('DD/MM/yyyy')}
        </Text>
        <View
          style={{
            width: 64,
            height: 16,
            borderRadius: 5,
            backgroundColor: items.trangThai == 1 ? '#38A938' : '#DD4066',
          }}
        >
          <Text style={{ fontSize: 10, textAlign: 'center', color: '#FFFFFF' }}>
            {items.trangThai == 1 ? 'Đã duyệt' : 'Chưa duyệt'}
          </Text>
        </View>
      </Row>
      <Text style={{ textAlign: 'justify' }}>{items.noidung}</Text>
    </Column>
  );
  // ------------------------------------
  // ------------ useEffect ----------------
  useEffect(() => {
    handleGetContectContents();
  }, []);
  // ----------- Action ------------------
  const onFormSubmit = (value) => {
    let now = new Date();
    let data = {
      validationResult: {},
      noidung: value.comment,
      tendangnhap: 'string',
      hoten: 'string',
      trangThai: 0,
      thoidiemgui: now.toISOString(),
    };
    request
      .post(API.POST_CONTACT_CONTENTS, data)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          handleGetContectContents();
          showToast(response.data.msg);
          return response.data;
        }
        return null;
      })
      .catch((error) => console.log(error));
  };
  const handleGetContectContents = () => {
    request
      .get(formatString(API.GET_CONTACT_CONTENTS, 1, 10))
      .then((response) => {
        if (response.data) {
          setData(response.data);
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };
  // ------------------------------------
  return (
    <Container>
      <Header
        style={{ backgroundColor: '#286FC3' }}
        color="#FFFFFF"
        status="primary"
        title="Liên hệ"
        hideLeftIcon={false}
      />
      <View
        style={{
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: '#E8E8E8',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#2C384A',
            padding: 10,
          }}
        >
          Nội dung thông tin cần liên hệ
        </Text>
        <Formik
          initialValues={formValues}
          onSubmit={(values, { resetForm }) => {
            onFormSubmit(values);
            resetForm();
          }}
          validationSchema={Schema}
        >
          {renderForm}
        </Formik>
      </View>
      <Content style={{ paddingHorizontal: 10 }}>
        <View style={{ padding: 10 }}>
          <Text style={[tw.mB2]}>{`Liên hệ đã gửi ( ${data?.length} )`}</Text>
          {data?.map((comment) => (
            <Item items={comment} key={comment.id} />
          ))}
        </View>
      </Content>
      <Toast config={toastConfig} position="bottom" visibilityTime={3000} />
    </Container>
  );
};

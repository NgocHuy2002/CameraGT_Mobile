import { useFocusEffect } from '@react-navigation/native';
import { Button, CheckBox, Icon, Input, Text } from '@ui-kitten/components';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import UserIcon from '@assets/icons/user.svg';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { CustomForm } from '@components/Form/form';
import FormikDatePicker from '@components/FormDatePicker/FormikDatePicker';
import FormikInput from '@components/FormInput/FormikInput';
import FormikSelect from '@components/FormSelect/FormikSelect';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';

import { API } from '@constants/api';
import { APP_CODE } from '@constants/app';
import { ROUTER } from '@constants/router';

import { userRegisterRoutine } from '@containers/Auth/saga/routines';

import request from '@services/request';

export default function AccountInfo({ navigation, route }) {
  const { registerBy, values, pass } = route.params;
  const dispatch = useDispatch();

  const [error, setError] = React.useState(false);

  const formValues = {
    name: '',
    gender: '',
    birth: '',
    address: '',
  };

  const noSpacesValidation = Yup.string()
    .required('Thông tin này không được bỏ trống')
    .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
      return value !== null && value !== undefined && value.trim() !== '';
    });

  const Schema = Yup.object().shape({
    name: noSpacesValidation,
    gender: noSpacesValidation,
    birth: noSpacesValidation,
    address: noSpacesValidation,
  });

  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Text
        style={[tw.mB4, tw.textBase, { color: '#92969A', alignSelf: 'center' }]}
      >
        Vui lòng nhập thông tin tài khoản
      </Text>
      <UserIcon style={{ alignSelf: 'center' }} />
      {/* <Icon name={'person-outline'} style={{ width: 115, height: 116.86, alignSelf: 'center' }} fill='#286FC3' /> */}
      <Column space={4} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikInput
            name={'name'}
            variant="outlined"
            containerStyle={tw.mB4}
            placeholder={'Họ và tên'}
          />
          <FormikSelect
            name="gender"
            variant="outlined"
            containerStyle={tw.mB4}
            uniqueKey="value"
            displayKey="label"
            options={[
              { value: 0, label: 'Nam' },
              { value: 1, label: 'Nữ' },
            ]}
            placeholder={'Nhập giới tính'}
          />
          <FormikDatePicker
            name="birth"
            containerStyle={tw.mB4}
            variant="outlined"
            placeholder="Chọn ngày sinh"
          />
          <FormikInput
            name="address"
            variant="outlined"
            containerStyle={tw.mB4}
            placeholder="Địa chỉ"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 343, height: 51 }}
          >
            Tiếp theo
          </Button>
          <Button onPress={handleSkip} appearance="ghost">
            Bỏ qua
          </Button>
        </View>
      </Column>
    </Column>
  );

  // ---------- useEffect ------------
  useFocusEffect(
    React.useCallback(() => {
      setError(false);
    }, []),
  );
  // ---------- Action ------------
  const onFormSubmit = async (value) => {
    // navigation.navigate(ROUTER.SUCCESS, { content: 'Tài khoản đã được tạo thành công' })
    const data = {
      userName: values.userName,
      sex: value.gender,
      fullName: value.name,
      dateOfBirth: value.birth,
      address: value.address,
    };
    console.log(data);
    request
      .put(API.UPDATE_USER_INFO, data)
      .then((response) => {
        if (response.data) {
          if (response.data.data == true) {
            console.log(response.data);
            navigation.navigate(ROUTER.SUCCESS, {
              content: 'Tài khoản đã được tạo thành công',
            });
          }
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(value);
  };

  const handleSkip = () => {
    navigation.navigate(ROUTER.SUCCESS, {
      content: 'Tài khoản đã được tạo thành công',
    });
  };
  return (
    <Container>
      <Header
        // status='primary'
        title="Thông tin tài khoản"
        hideLeftIcon={false}
      />
      <Content scrollEnabled={true} safeAreaEnabled={false}>
        <Formik
          initialValues={formValues}
          onSubmit={onFormSubmit}
          validationSchema={Schema}
        >
          {renderForm}
        </Formik>
      </Content>
    </Container>
  );
}

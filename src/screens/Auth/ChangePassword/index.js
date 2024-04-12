import { useFocusEffect } from '@react-navigation/native';
import { Button, CheckBox, Icon, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { CustomForm } from '@components/Form/form';
import FormikInput from '@components/FormInput/FormikInput';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';

import { API } from '@constants/api';
import { APP_CODE } from '@constants/app';
import { ROUTER } from '@constants/router';

import request from '@services/request';

import TopNavigationCustom from '../../../components/TopNavigation';

export default function ChangePasswordForNew({ navigation, route }) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [error, setError] = React.useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const formValues = {
    email: '',
    username: '',
    password: '',
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const noSpacesValidation = Yup.string()
    .required('Thông tin này không được bỏ trống')
    .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
      return value !== null && value !== undefined && value.trim() !== '';
    });

  const Schema = Yup.object().shape({
    email: noSpacesValidation,
    username: noSpacesValidation,
    password: noSpacesValidation,
  });

  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Column space={4} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikInput
            name="email"
            variant="outlined"
            containerStyle={tw.mB4}
            required={true}
            placeholder="Email"
          />
          <FormikInput
            name="username"
            variant="outlined"
            containerStyle={tw.mB4}
            placeholder="Nhập tên tài khoản"
          />
          <FormikInput
            name="password"
            variant="outlined"
            containerStyle={tw.mB4}
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder="Nhập mật khẩu"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 343, height: 51 }}
          >
            Đăng ký
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
  const onFormSubmit = async (pass) => {
    let body = {
      userName: pass.username,
      email: pass.email,
      password: pass.password,
    };
    request
      .post(API.REGISTER, body)
      .then((response) => {
        if (response.data) {
          if (response.data.data) {
            console.log(response.data.data);
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
    console.log(pass);
  };
  return (
    <Container>
      <Header
        // status='primary'
        title={'Đăng ký tài khoản mới'}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
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

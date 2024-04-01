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
  const { registerBy, values, isNew } = route.params;

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const formValues = {
    [registerBy === 'phone' ? 'phone' : 'email']:
      values?.email || values?.phone,
    new_password: '',
    re_new_password: '',
  };
  const formValuesForChangePass = {
    new_password: '',
    re_new_password: '',
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
    [registerBy === 'phone' ? 'phone' : 'email']: noSpacesValidation,
    new_password: noSpacesValidation,
    re_new_password: noSpacesValidation.oneOf(
      [Yup.ref('new_password'), null],
      'Mật khẩu nhập lại không khớp',
    ),
  });
  const SchemaForChangePass = Yup.object().shape({
    new_password: noSpacesValidation,
    re_new_password: noSpacesValidation.oneOf(
      [Yup.ref('new_password'), null],
      'Mật khẩu nhập lại không khớp',
    ),
  });

  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Text
        style={[tw.mB4, tw.textBase, { color: '#92969A', alignSelf: 'center' }]}
      >
        {isNew
          ? 'Số điện thoại/Email này sẽ được mặc định là tên đăng nhập nếu bạn không cài đặt tài khoản'
          : 'Vui lòng nhập mật khẩu mới để thực hiện khôi phục lại mật khẩu'}
      </Text>
      <Column space={4} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          {isNew ? (
            <FormikInput
              name={registerBy == 'phone' ? 'phone' : 'email'}
              variant="outlined"
              containerStyle={tw.mB4}
              required={true}
              placeholder={registerBy == 'phone' ? 'Số điện thoại' : 'Email'}
            />
          ) : null}
          <FormikInput
            name="new_password"
            variant="outlined"
            containerStyle={tw.mB4}
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder="Nhập mật khẩu mới của bạn"
          />
          <FormikInput
            name="re_new_password"
            variant="outlined"
            containerStyle={tw.mB4}
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder="Nhập lại mật khẩu mới của bạn"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 343, height: 51 }}
          >
            Tiếp theo
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
    if (isNew) {
      let body = {
        userName: values.email,
        email: pass.email,
        password: pass.new_password,
        appCode: APP_CODE,
      };
      request
        .post(API.REGISTER, body)
        .then((response) => {
          if (response.data) {
            if (response.data.data) {
              console.log(response.data.data);
              navigation.navigate(ROUTER.ACCOUNT_INFO, {
                registerBy: registerBy,
                values: response.data.data,
                pass: pass,
              });
            }
          }
          return null;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let body = {
        otp: values.otp,
        email: values.email,
        newPassword: pass.new_password,
        userName: values.email,
        appCode: APP_CODE,
      };
      request
        .post(API.FORGOT_PASSWORD, body)
        .then((response) => {
          if (response.data) {
            if (response.data.data) {
              console.log(response.data.data);
              navigation.navigate(ROUTER.SUCCESS, {
                content: 'Mật khẩu đã được khôi phục thành công',
              });
            }
          }
          return null;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log(pass);
  };
  return (
    <Container>
      <Header
        // status='primary'
        title={isNew ? 'Chào mừng bạn' : 'Nhập mật khẩu mới'}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Formik
          initialValues={isNew ? formValues : formValuesForChangePass}
          onSubmit={onFormSubmit}
          validationSchema={isNew ? Schema : SchemaForChangePass}
        >
          {renderForm}
        </Formik>
      </Content>
    </Container>
  );
}

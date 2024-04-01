import { useFocusEffect } from '@react-navigation/native';
import { Button, CheckBox, Icon, Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { tw } from 'react-native-tailwindcss';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import FormikInput from '@components/FormInput/FormikInput';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import request from '@services/request';

export default function ChangeOldPassword({ navigation, route }) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const formValuesForChangePass = {
    old_password: '',
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

  const SchemaForChangePass = Yup.object().shape({
    old_password: noSpacesValidation,
    new_password: noSpacesValidation,
    re_new_password: noSpacesValidation.oneOf(
      [Yup.ref('new_password'), null],
      'Mật khẩu nhập lại không khớp',
    ),
  });

  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Text style={[tw.textBase, { color: '#92969A', alignSelf: 'center' }]}>
        Vui lòng nhập thông tin mật khẩu để thực hiện đổi mật khẩu
      </Text>
      <Column space={2} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikInput
            name="old_password"
            variant="outlined"
            containerStyle={tw.mB2}
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder="Nhập mật khẩu cũ của bạn"
          />
          {error ? (
            <Text style={[tw.mB2, { fontSize: 12, color: 'red' }]}>
              Mật khẩu cũ không đúng
            </Text>
          ) : null}
          <FormikInput
            name="new_password"
            variant="outlined"
            containerStyle={tw.mB2}
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            placeholder="Nhập mật khẩu mới của bạn"
          />
          <FormikInput
            name="re_new_password"
            variant="outlined"
            containerStyle={tw.mB2}
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
            Đổi mật khẩu
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
    // if (pass.old_password != 'a') {
    //     setError(true)
    // }
    // else {
    //     navigation.navigate(ROUTER.SUCCESS, { content: 'Đổi mật khẩu thành công' })
    // }
    let data = {
      oldPassword: pass.old_password,
      newPassword: pass.new_password,
    };
    request
      .post(API.CHANGE_PASSWORD, data)
      .then((response) => {
        if (response.data) {
          if (response.data.data) {
            console.log(response.data.data);
            navigation.navigate(ROUTER.SUCCESS, {
              content: 'Đổi mật khẩu thành công',
              subContent: 'Đăng nhập lại để tiếp tục ',
            });
          }
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Header
        // status='primary'
        title={'Đổi mật khẩu mới'}
        color={'#286FC3'}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Formik
          initialValues={formValuesForChangePass}
          onSubmit={onFormSubmit}
          validationSchema={SchemaForChangePass}
        >
          {renderForm}
        </Formik>
      </Content>
    </Container>
  );
}

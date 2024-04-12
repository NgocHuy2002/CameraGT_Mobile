import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, CheckBox, Icon, Input, Text } from '@ui-kitten/components';
import axios from 'axios';
import { Formik, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import {
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { tw } from 'react-native-tailwindcss';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import { CustomForm } from '@components/Form/form';
import FormikInput from '@components/FormInput/FormikInput';
import Header from '@components/Header/Header';
import { Column } from '@components/Stack';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import TopNavigationCustom from '../../../components/TopNavigation';
import { userLoginRoutine } from '../saga/routines';
import { selectToken } from '../saga/selectors';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [username, setUserName] = React.useState('');
  const [pass, setPass] = React.useState('');

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const formValues = {
    username: username,
    password: pass,
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
    username: noSpacesValidation,
    password: noSpacesValidation,
  });

  const renderForm = (formik) => (
    <Column space={4} style={[tw.p4, { flex: 1 }]}>
      <Column space={2} style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <FormikInput
            name="username"
            variant="outlined"
            required={true}
            containerStyle={tw.mB4}
            placeholder="Tên đăng nhập"
          />
          <FormikInput
            name="password"
            variant="outlined"
            password={true}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            containerStyle={tw.mB4}
            placeholder="Nhập mật khẩu"
          />
          {error ? (
            <Text style={{ fontSize: 12, color: 'red' }}>
              Tên đăng nhập hoặc mật khẩu không đúng
            </Text>
          ) : null}
          <CheckBox
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            Ghi nhớ tài khoản
          </CheckBox>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={() => navigation.navigate(ROUTER.FORGET_PASSWORD)}
            appearance="ghost"
          >
            Quên mật khẩu ?
          </Button>
          <Button
            onPress={formik.handleSubmit}
            style={{ borderRadius: 100, width: 343, height: 51 }}
          >
            Đăng nhập
          </Button>
          <Button
            onPress={() => navigation.navigate(ROUTER.CHANGE_PASSWORD)}
            appearance="ghost"
          >
            Đăng ký tài khoản
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
  useEffect(() => {
    getRememberedUser();
  }, []);
  // ---------- Action ------------
  const onFormSubmit = async (values) => {
    values = {
      // grant_type: 'password',
      username: values.username,
      password: values.password, //'9876543A@a'
      // client_id: 'vilis-mobile-client',
      // client_secret: 'n)3b^Q7g]Jd6T&$^',
    };
    if (checked) {
      rememberUser(values);
    }
    await dispatch(userLoginRoutine(values));
  };
  const rememberUser = async (values) => {
    try {
      await AsyncStorage.setItem('USERUSERNAMEKEY', values.username);
      await AsyncStorage.setItem('USERPASSWORDKEY', values.password);
      await AsyncStorage.setItem('CHECKED', JSON.stringify(checked));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('USERUSERNAMEKEY');
      const password = await AsyncStorage.getItem('USERPASSWORDKEY');
      const isChecked = await AsyncStorage.getItem('CHECKED');
      if (username !== null && password !== null) {
        // We have username!!
        setUserName(username);
        setPass(password);
        setChecked(JSON.parse(isChecked));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  // ------------------------------------------
  return (
    <Container>
      <Header
        // status='primary'
        title="Đăng nhập"
        hideLeftIcon={true}
        // color='#FFFFFF'
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Formik
          initialValues={formValues}
          onSubmit={onFormSubmit}
          enableReinitialize={true}
          // validationSchema={Schema}
        >
          {renderForm}
        </Formik>
      </Content>
    </Container>
  );
}

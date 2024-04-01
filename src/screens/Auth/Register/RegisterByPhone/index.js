import { Button, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { tw } from 'react-native-tailwindcss';
import * as Yup from 'yup';

import Container from '@components/Container/Container';
import Content from '@components/Content/Content';
import FormikInput from '@components/FormInput/FormikInput';
import FormikSelect from '@components/FormSelect/FormikSelect';
import Header from '@components/Header/Header';
import { Column, Row } from '@components/Stack';

import { API } from '@constants/api';
import { ROUTER } from '@constants/router';

import request from '@services/request';

export const RegisterBy = ({ route, navigation }) => {
  const { registerBy, isNew } = route.params;
  const phoneInput = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState('+84');

  const phoneValues = {
    // country: '',
    phone: '',
  };
  const emailValues = {
    email: '',
  };
  const countryData = [
    { key: 'vn', icon: 'sun-outline', numb: '+84' },
    { key: 'cn', icon: 'radio-button-off-outline', numb: '+86' },
    { key: 'us', icon: 'star-outline', numb: '+1' },
  ];

  const noSpacesValidation = Yup.string()
    .required('Thông tin này không được bỏ trống')
    .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
      return value !== null && value !== undefined && value.trim() !== '';
    });

  const phoneSchema = Yup.object().shape({
    country: noSpacesValidation,
    phone: Yup.number('Phải là số ').required(
      'Thông tin này không được bỏ trống',
    ),
  });
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email('Không đúng định dạng email')
      .test('no-spaces', 'Không được chỉ nhập khoảng trắng', (value) => {
        return value !== null && value !== undefined && value.trim() !== '';
      }),
  });

  const renderForm = (formik) => {
    return (
      <Column style={[tw.p4, { flex: 1 }]}>
        <Text style={[tw.mB4, tw.textBase, { color: '#92969A' }]}>
          {registerBy == 'phone'
            ? 'Mã xác minh sẽ được gửi đến số điện thoại của bạn'
            : 'Mã xác minh sẽ được gửi đến email của bạn'}
        </Text>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          {registerBy == 'phone' ? (
            <Row space={2} style={[tw.mB4]}>
              {/* <FormikSelect
                                name="country"
                                variant="outlined"
                                uniqueKey="key"
                                displayKey="numb"
                                options={countryData}
                                selectedIndex={selectedIndex}
                                containerStyle={tw.w32}
                            />
                            <FormikInput
                                name="phone"
                                variant="outlined"
                                required={true}
                                placeholder="Nhập số điện thoại của bạn"
                                containerStyle={tw.w56}
                            /> */}
              <PhoneInput
                ref={phoneInput}
                defaultCode="VN"
                layout="first"
                name={'phone'}
                // onChangeText={(text) => {
                //     setValue(text);
                // }}
                // onChangeFormattedText={(text) => {
                //     setFormattedValue(text);
                // }}
                withDarkTheme
                withShadow
                autoFocus
              />
            </Row>
          ) : (
            <Row style={[tw.mB4]}>
              <FormikInput
                name="email"
                variant="outlined"
                required={true}
                placeholder="Nhập email của bạn"
                containerStyle={{ width: '100%' }}
              />
            </Row>
          )}
          <Button
            onPress={formik.handleSubmit}
            style={[
              {
                borderRadius: 100,
                width: 343,
                height: 51,
                alignSelf: 'center',
              },
            ]}
          >
            <Text>Gửi mã xác thực OTP</Text>
          </Button>
        </View>
      </Column>
    );
  };

  // ---------- Action ------------
  const onFormSubmit = async (values) => {
    if (registerBy == 'phone') {
      const phoneNum =
        `+` + phoneInput.current.state.code + phoneInput.current.state.number;
      console.log(phoneNum);
    } else {
      request.post(API.SEND_OTP_EMAIL, values).then((response) => {
        if (response.data) {
          console.log(response.data.data, '- sendOtpForEmail');
          if (response.data.data == true) {
            navigation.navigate(ROUTER.OTP, {
              registerBy: registerBy,
              values: values,
              isNew: isNew,
            });
          }
        }
        return null;
      });
    }
  };
  return (
    <Container>
      <Header
        // status='primary'
        title={registerBy == 'phone' ? 'Nhập số điện thoại' : 'Nhập email'}
        hideLeftIcon={false}
      />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <Formik
          initialValues={registerBy == 'phone' ? null : emailValues}
          onSubmit={onFormSubmit}
          validationSchema={registerBy == 'phone' ? null : emailSchema}
        >
          {renderForm}
        </Formik>
      </Content>
    </Container>
  );
};

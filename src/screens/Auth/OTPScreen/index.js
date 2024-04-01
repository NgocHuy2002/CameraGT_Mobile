import { useFocusEffect } from '@react-navigation/native';
import { Button, Text } from '@ui-kitten/components';
import { useInterval } from 'ahooks';
import { Field, Formik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
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

export const OTPScreen = ({ route, navigation }) => {
  const { registerBy, values, isNew } = route.params;
  let otpInput = useRef(null);
  const intervalId = useRef(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const screenWidth = Dimensions.get('screen').width * 0.9;
  const [time, setTime] = useState(59);
  const timerRef = useRef(time);

  // ---------- useEffect ------------
  useFocusEffect(
    useCallback(() => {
      setError(false);
    }, []),
  );
  // useEffect(() => {
  //   console.log(time);
  //   const timerId = setInterval(() => {
  //     timerRef.current -= 1;
  //     if (timerRef.current < 0) {
  //       clearInterval(timerId);
  //       // request.post(API.SEND_OTP_EMAIL, values).then((response) => {
  //       //   if (response.data) {
  //       //     if (response.data.data == true) {
  //       //       setTime(59)
  //       //       // clearInterval(timerId, 1000)
  //       //       restart();
  //       //     }
  //       //   }
  //       //   return null;
  //       // });
  //     } else {
  //       setTime(timerRef.current);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, [time]);
  // useEffect(() => {
  //   intervalId.current = useInterval(() => {
  //     timerRef.current -= 1;
  //     setTime(timerRef.current)
  //   }, 1000);
  //   return () => clearInterval(intervalId.current);
  // }, [])
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, []);
  const handleStop = () => {
    request.post(API.SEND_OTP_EMAIL, values).then((response) => {
      if (response.data) {
        if (response.data.data == true) {
          setTime(59);
        }
      }
      return null;
    });
  };
  // ---------- Action ------------
  const clearText = () => {
    otpInput.current.clear();
  };
  const onFormSubmit = async (data) => {
    let body = {
      email: registerBy == 'email' ? values.email : values.phone,
      otp: data,
    };
    request.post(API.VERIFY_OTP_EMAIL, body).then((response) => {
      if (response?.data) {
        console.log(response.data?.data, '- VERIFY_OTP_EMAIL');
        if (response.data.data == true) {
          navigation.navigate(ROUTER.CHANGE_PASSWORD, {
            registerBy: registerBy,
            values: body,
            isNew: isNew,
          });
        } else {
          setError(true);
          clearText();
        }
      }
      return null;
    });
    // navigation.navigate(ROUTER.CHANGE_PASSWORD, { registerBy: registerBy, values: values, isNew: isNew })
  };
  return (
    <Container>
      <Header
        // status='primary'
        title="Nhập mã xác thực"
        hideLeftIcon={false}
      />
      <Content>
        <Column style={[{ flex: 1, justifyContent: 'space-between' }]}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[tw.mB4, tw.textBase, { color: '#92969A' }]}>
              Vui lòng nhập mã số gồm 6 chữ số bao gồm:
            </Text>
            <OTPTextInput
              ref={otpInput}
              handleTextChange={(e) => setOtp(e)}
              inputCount={6}
              inputCellLength={1}
              textInputStyle={{
                borderWidth: 1,
                borderColor: '#286FC3',
                borderRadius: 8,
                width: 40,
                height: 40,
              }}
              containerStyle={{ width: screenWidth }}
            />
            {error ? (
              <Text style={{ fontSize: 15, color: '#DD4066' }}>
                Mã xác thực không đúng
              </Text>
            ) : null}
          </View>
          <Button
            onPress={() => onFormSubmit(otp)}
            style={{
              borderRadius: 100,
              width: 343,
              height: 51,
              alignSelf: 'center',
              marginBottom: '5%',
            }}
          >
            <Text>Gửi mã xác thực OTP</Text>
          </Button>
          {time <= 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: '5%',
                fontSize: 16,
                color: '#286FC3',
              }}
            >
              {`Không nhận được mã? `}
              <Text
                style={{
                  fontSize: 16,
                  color: '#286FC3',
                  textDecorationLine: 'underline',
                }}
                onPress={() => handleStop()}
              >{`Gửi lại mã`}</Text>
            </Text>
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: '5%',
                fontSize: 16,
                color: '#286FC3',
              }}
            >
              {`Gửi lại mã `}
              <Text style={{ fontSize: 16, color: 'red' }}>{`${time}`}</Text>
              <Text style={{ fontSize: 16, color: '#286FC3' }}>s</Text>
            </Text>
          )}
        </Column>
      </Content>
    </Container>
  );
};

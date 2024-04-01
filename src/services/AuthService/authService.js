import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function requestLogin(data) {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  return axios.post(API.LOGIN, formBody, myHeaders).then((response) => {
    if (response?.data) {
      return response.data.access_token;
    }
    return null;
  });
}

export function requestRegister(data) {
  request.post(API.REGISTER, data).then((response) => {
    if (response) {
      console.log(response, '- requestRegister');
      return response;
    }
    return null;
  });
}

export function requestLogout() {
  return request.get(API.LOGOUT).then((response) => {
    if (response) {
      return response;
    }
    return null;
  });
}
// ---------------- OTP API -------------------
export function sendOtpForEmail(data) {
  console.log('here >>>', data);
  request.post(API.SEND_OTP_EMAIL, data).then((response) => {
    if (response) {
      console.log(response, '- sendOtpForEmail');
      return response;
    }
    return null;
  });
}

export function verifyOtpForEmail(data) {
  console.log('here >>>', data);
  request.post(API.VERIFY_OTP_EMAIL, data).then((response) => {
    if (response) {
      console.log(response, '- verifyOtpForEmail');
      return response;
    }
    return null;
  });
}
// ----------------------------------------------------

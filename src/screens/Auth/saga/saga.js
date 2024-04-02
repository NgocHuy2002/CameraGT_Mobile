import { call, put, takeLeading } from 'redux-saga/effects';

import { ROUTER } from '@constants/router';

import Alert from '@modules/Alert/Alert';

import {
  requestLogin,
  requestLogout,
  requestRegister,
  sendOtpForEmail,
} from '@services/AuthService/authService';
import { requestGetUserInfo } from '@services/UserService/UserService';
import * as navigationService from '@services/navigationService';

import {
  userInfo,
  userLoginRoutine,
  userLogoutRoutine,
  userRegisterRoutine,
} from './routines';

export function* userLogin(action) {
  try {
    // const data = yield call(requestLogin, action.payload); // Call to api
    const data =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MTE1MzAwMjYsImV4cCI6MTcxMTUzMzYyNiwiaXNzIjoiaHR0cDovLzEwLjE2OC40LjIzMTo1MDM1IiwiYXVkIjpbImh0dHA6Ly8xMC4xNjguNC4yMzE6NTAzNS9yZXNvdXJjZXMiLCJhdXRob3JpemUtdmlsaXMtYXBpIl0sImNsaWVudF9pZCI6InZpbGlzLW1vYmlsZS1jbGllbnQiLCJzdWIiOiIyOGY0ZWQ1ZC0yOTExLTQ2YmMtYmQxNy1lYmYzOTFmNmJmYzYiLCJhdXRoX3RpbWUiOjE3MTE1MzAwMjYsImlkcCI6ImxvY2FsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic290bm10Y21AZ21haWwuY29tIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJOTzdDVzUyRUNaUUw1SDM1NldQQ0lYQ1YzUFlFNUJGQyIsInByb2ZpbGUiOiJzdSIsInJvbGUiOlsiU3VwZXJBZG1pbiIsIkFkbWluIiwidXNlciIsImRhdGFFdmVudFJlY29yZHMudXNlciIsImRhdGFFdmVudFJlY29yZHMiLCJzZWN1cmVkRmlsZXMudXNlciIsInNlY3VyZWRGaWxlcyJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzdSIsIm5hbWUiOiJzdSIsImVtYWlsIjoic290bm10Y21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6IjA5MTc3MDkwMTUiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJnaXZlbl9uYW1lIjoic3UiLCJhZGRyZXNzIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYXV0aG9yaXplLXZpbGlzLWFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.AlnQzH4B6xCK4RSPwtFINMl1hGjR8mURWrA8mPPPTEDmJNLLm18Pss5hrIsL7ZujLemnJ_FkBSzfI8d4Fo79-GVH1VYcPilSwuNCQHHIh4UmSTQhzQpUakr1kdDU0MbxQ543O1tIbcKOAilpIW7bDS8kLxrEq549b5s0Y_f1bLmtLAE7Djx0Xhns82qPlenBfHKrdQ14LyEoXxcnwC4rZ22tUEz7E2qO-bVDec8QuVDIDIZ07QY59fxiFmtH8b1aPpY4VO9IOmZ351Ypn3e9Ft9HjVbN8sJS1htGPcm_5e24hB08TZFyHXcF0zhw9c3j8Ok9vWGOqtR-gVN6lHQm6A';
    if (data) {
      yield put(userLoginRoutine.success(data));
      // yield call(getUserInfo);
      navigationService.replace(ROUTER.MAIN_NAVIGATOR);
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(userLoginRoutine.failure(error));
  }
}

// export function* getUserInfo() {
//   const data = yield call(requestGetUserInfo);
//   if (data) {
//     yield put(userInfo.success(data));
//   }
// }

export function* userRegister(action) {
  try {
    console.log('userRegister');
    const data = yield call(requestRegister, action.payload); // Call to api
    if (data) {
      yield put(userRegisterRoutine.success(data));
      // yield call(getUserInfo);
      navigationService.replace(ROUTER.MAIN_NAVIGATOR);
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(userLoginRoutine.failure(error));
  }
}

// export function* getUserInfo() {
//   const data = yield call(getUserByToken);
//   if (data) {
//     yield put(userInfo.success(data));
//   }
// }

// export function* getUserListByOrg() {
//   const data = yield call(getUsersByOrg, 1, 0);
//   if (data) {
//     yield put(userList.success(data));
//   }
// }

export function* userLogout(action) {
  console.log('Logout saga');
  yield call(requestLogout); // Call to api
  yield put(userLogoutRoutine.success());
  navigationService.replace(ROUTER.AUTH_NAVIGATOR);
}

// -------------- OTP -------------------
export function* sendOtpEmail(action) {
  try {
    const data = yield call(sendOtpForEmail, action.payload); // Call to api
    if (data) {
      // yield put(userLoginRoutine.success(data));
      // navigationService.replace(ROUTER.MAIN_NAVIGATOR);
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(userLoginRoutine.failure(error));
  }
}
export default function* authSaga() {
  yield takeLeading(userLoginRoutine.TRIGGER, userLogin);
  yield takeLeading(userRegisterRoutine.TRIGGER, userRegister);
  // yield takeLeading(userLoginRoutine.SUCCESS, getUserInfo);
  // yield takeLeading(userInfo.TRIGGER, getUserInfo);
  // yield takeLeading(userList.TRIGGER, getUserListByOrg);
  yield takeLeading(userLogoutRoutine.TRIGGER, userLogout);
}

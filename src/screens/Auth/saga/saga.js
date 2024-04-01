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
    const data = yield call(requestLogin, action.payload); // Call to api
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

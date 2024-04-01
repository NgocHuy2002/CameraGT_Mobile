import axios from 'axios';
import { useDispatch } from 'react-redux';

// import { authActions } from '@containers/Auth/slice';
import LoadingService from '@components/Loading/LoadingService';

import { API_URL_35 } from '@constants/api';
import { ROUTER } from '@constants/router';

import { userLogoutRoutine } from '@containers/Auth/saga/routines';
import { authActions } from '@containers/Auth/saga/slice';

import Toast from '@modules/Toast/Toast';

import * as navigationService from '@services/navigationService';

import { getStore } from '../store';

let requestsCount = 0;

// axios.defaults.baseURL = API_URL_35;

axios.defaults.timeout = 15000;

axios.interceptors.request.use(
  function onRequest(config) {
    console.log('--- request ---');
    requestsCount = requestsCount + 1;
    if (!config?.hideLoading) {
      startActivityLoading();
    }
    return config;
  },
  function onRequestError(error) {
    console.log('--- error ---');
    requestsCount = requestsCount - 1;
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function onResponse(response) {
    requestsCount = requestsCount - 1;
    updateActivityLoading();

    return response;
  },
  function onResponseError(error) {
    console.log(error);

    requestsCount = requestsCount - 1;
    updateActivityLoading();

    let errorText = 'Lỗi xảy ra, vui lòng kiểm tra hoặc liên hệ quản trị viên';

    if (error.code === 'ECONNABORTED') {
      errorText = 'Thời gian chờ đã quá hạn, vui lòng thử lại';
    } else if (error.response) {
      const { token } = getStore().getState().auth;
      // console.log(error.response.data);

      if (error.response.data?.message) {
        errorText = error.response.data.message;
      }
      if (error.response.data?.error_description) {
        errorText = error.response.data.error_description;
      }

      if (error.response.status === 401 && token) {
        console.log('--- token timeout ---');
        errorText = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
        getStore().dispatch(authActions.clear());
        navigationService.replace(ROUTER.AUTH_NAVIGATOR);
      }
    }

    const showError = error.config.showError ?? true;
    if (showError) Toast.showText(errorText);

    return Promise.reject(error);
  },
);

function startActivityLoading() {
  const isLoading = LoadingService.isLoading();
  if (!isLoading && requestsCount > 0) {
    LoadingService.show();
  }
}

function updateActivityLoading() {
  const isLoading = LoadingService.isLoading();
  if (isLoading && requestsCount <= 0) {
    LoadingService.hide();
  }
}

export default axios;

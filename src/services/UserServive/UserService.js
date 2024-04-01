import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function updateUserInfoApi(data) {
  return request.put(API.UPDATE_USER_INFO, data).then((response) => {
    if (response.data) {
      if (response.data.data == true) {
        // console.log(response.data);
        // navigation.navigate(ROUTER.SUCCESS, { content: 'Tài khoản đã được tạo thành công' })
        return response.data;
      }
    }
    return null;
  });
}

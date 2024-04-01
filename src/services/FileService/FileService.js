import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function requestUploadAvatarApi(formdata) {
  // console.log(data);
  return request
    .post(API.UPLOAD_AVATAR, formdata)
    .then((response) => {
      if (response) {
        return response.data;
      }
      return null;
    })
    .catch((error) => console.log('error', error));
}

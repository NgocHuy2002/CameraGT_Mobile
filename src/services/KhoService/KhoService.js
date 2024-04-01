import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function getKhoByLinhVucApi(linhVuc, page, size) {
  return request
    .get(formatString(API.GET_KHO_BY_LINH_VUC, linhVuc, page, size))
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      return null;
    })
    .catch((error) => console.log(error));
}

export function getDoiTuongByKhoIdApi(id, page, size) {
  return request
    .get(formatString(API.GET_DOI_TUONG_BY_KHO_ID, id, page, size))
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      return null;
    })
    .catch((error) => console.log(error));
}

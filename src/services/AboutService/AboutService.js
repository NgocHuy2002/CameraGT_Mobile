import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function getAboutApi(slug, type, page, size) {
  return request
    .get(formatString(API.GET_ABOUT, slug, type, page, size))
    .then((response) => {
      if (response.data) {
        return response.data;
      }
      return null;
    })
    .catch((error) => console.log(error));
}

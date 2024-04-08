import axios from 'axios';

import { API, API_URL_34, API_URL_35 } from '@constants/api';

import { formatString } from '@helpers/formatString';

import request from '@services/request';

export function requestGetRecords(username) {
  return request.get(formatString(API.RECORD, username)).then((response) => {
    if (response.data) {
      return response.data;
    }
    return null;
  });
}

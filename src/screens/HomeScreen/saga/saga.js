import { call, put, takeLeading } from 'redux-saga/effects';

import Alert from '@modules/Alert/Alert';

import {
  getHottestPostsApi,
  getLatestPostsApi,
  getLinhVucApi,
} from '@services/PostsService/PostsService';

import {
  getHottestPostsRoutine,
  getLatestPostsRoutine,
  getLinhVucRoutine,
} from './routines';

export function* getLinhVuc(action) {
  try {
    const data = yield call(getLinhVucApi, action.payload); // Call to api
    if (data) {
      console.info('data >>', data);
      yield put(getLinhVucRoutine.success(data));
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(getLinhVucRoutine.failure(error));
  }
}

export function* getLatestPosts(action) {
  try {
    const data = yield call(getLatestPostsApi, action.payload); // Call to api
    if (data) {
      console.info('data >>', data);
      yield put(getLatestPostsRoutine.success(data));
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(getLinhVucRoutine.failure(error));
  }
}

export function* getHottestPosts(action) {
  try {
    const data = yield call(getHottestPostsApi, action.payload); // Call to api
    if (data) {
      console.info('data >>', data);
      yield put(getHottestPostsRoutine.success(data));
    } else {
      Alert.showAlert(data.message);
    }
  } catch (error) {
    yield put(getLinhVucRoutine.failure(error));
  }
}

export default function* postsSaga() {
  yield takeLeading(getLinhVucRoutine.TRIGGER, getLinhVuc);
  yield takeLeading(getLatestPostsRoutine.TRIGGER, getLatestPosts);
  yield takeLeading(getHottestPostsRoutine.TRIGGER, getHottestPosts);
}

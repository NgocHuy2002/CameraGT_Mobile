import { all } from 'redux-saga/effects';

import authSaga from '@containers/Auth/saga/saga';
import postsSaga from '@containers/HomeScreen/saga/saga';

export default function* rootSaga() {
  yield all([authSaga(), postsSaga()]);
}

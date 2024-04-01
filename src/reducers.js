import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { SECURE_KEY, STORAGE_KEY } from '@constants/app';

import { appReducer } from '@containers/App/slice';
import { authReducer } from '@containers/Auth/saga/slice';
import { postsReducer } from '@containers/HomeScreen/saga/slice';

export default function createReducer(injectedReducers = {}) {
  const secureStorage = createSecureStore();

  const persistConfig = {
    key: STORAGE_KEY,
    storage: AsyncStorage,
    version: 1,
    timeout: 30000,
    whitelist: ['setting'],
    stateReconciler: autoMergeLevel2,
  };

  const securePersistConfig = {
    key: SECURE_KEY,
    storage: secureStorage,
    version: 1,
    timeout: 30000,
    stateReconciler: autoMergeLevel2,
  };

  const rootReducer = combineReducers({
    app: appReducer,
    auth: persistReducer(securePersistConfig, authReducer),
    posts: postsReducer,
    // product: productReducer,
    // notification: notificationReducer,
    // procedure: procedureReducer,
    // factory: factoryReducer,
    // setting: settingReducer,
    ...injectedReducers,
  });

  return persistReducer(persistConfig, rootReducer);
}

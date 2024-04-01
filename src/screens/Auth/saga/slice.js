import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { SECURE_KEY } from '@constants/app';

import * as tokenService from '@services/tokenService';

import {
  userInfo,
  userList,
  userLoginRoutine,
  userLogoutRoutine,
} from './routines';

// import { updateUserInfo } from '../Profile/ProfileEdit/saga/routines';

export const initialState = {
  user: null,
  list: null,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: (state) => {
      state.user = null;
      state.list = null;
      state.token = null;
      tokenService.clearToken();
    },
  },
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      if (action.key === SECURE_KEY) {
        if (action.payload && action.payload.token) {
          tokenService.setToken(action.payload.token);
        }
      }
    },
    [userLoginRoutine.SUCCESS]: (state, action) => {
      state.token = action.payload;
      tokenService.setToken(action.payload);
    },
    // [userInfo.SUCCESS]: (state, action) => {
    //   state.user = action.payload.data;
    // },
    // [userList.SUCCESS]: (state, action) => {
    //   state.list = action.payload;
    // },
    // [updateUserInfo.SUCCESS]: (state, action) =>{
    //   state.user = action.payload;
    // },
    [userLogoutRoutine.SUCCESS]: (state, action) => {
      state.user = null;
      state.list = null;
      state.token = null;
      tokenService.clearToken();
    },
  },
});
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

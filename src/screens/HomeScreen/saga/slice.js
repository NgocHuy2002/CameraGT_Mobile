import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { SECURE_KEY } from '@constants/app';

import * as tokenService from '@services/tokenService';

import {
  getHottestPostsRoutine,
  getLatestPostsRoutine,
  getLinhVucRoutine,
  userInfo,
  userList,
  userLoginRoutine,
  userLogoutRoutine,
} from './routines';

// import { updateUserInfo } from '../Profile/ProfileEdit/saga/routines';

export const initialState = {
  linh_vuc: null,
  latest_posts: null,
  hottest_post: null,
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.linh_vuc = null;
      state.latest_posts = null;
      state.hottest_post = null;
    },
  },
  extraReducers: {
    [getLinhVucRoutine.SUCCESS]: (state, action) => {
      state.linh_vuc = action.payload;
    },
    [getLatestPostsRoutine.SUCCESS]: (state, action) => {
      state.latest_posts = action.payload;
    },
    [getHottestPostsRoutine.SUCCESS]: (state, action) => {
      state.hottest_post = action.payload;
    },
  },
});
export const postsActions = postsSlice.actions;
export const postsReducer = postsSlice.reducer;

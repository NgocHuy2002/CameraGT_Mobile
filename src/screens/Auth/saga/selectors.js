import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

export const selectAuth = (state) => state.auth || initialState;

export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.user || {},
);

export const selectUserList = createSelector(
  selectAuth,
  (authState) => authState.list || {},
);

export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token,
);

export const selectUserId = createSelector(selectUser, (user) => user._id);

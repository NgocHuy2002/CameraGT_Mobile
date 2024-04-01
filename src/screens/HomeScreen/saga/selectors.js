import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

export const selectPosts = (state) => state.posts || initialState;

export const selectLinhVuc = createSelector(
  selectPosts,
  (postsState) => postsState.linh_vuc || {},
);

export const selectLatestPosts = createSelector(
  selectPosts,
  (postsState) => postsState.latest_posts || {},
);

export const selectHottestPosts = createSelector(
  selectPosts,
  (postsState) => postsState.hottest_post || {},
);

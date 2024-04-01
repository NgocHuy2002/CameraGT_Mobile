import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

export const selectApp = (state) => state.app || initialState;

export const selectLoading = createSelector(
  selectApp,
  (appState) => appState.isLoading,
);

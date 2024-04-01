// routerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // Initial route
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    resetToken(state, action) {
      state.token = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;

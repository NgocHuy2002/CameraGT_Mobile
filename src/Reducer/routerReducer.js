// routerReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: 'HOME', // Initial route
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    navigateTo(state, action) {
      state.route = action.payload;
    },
  },
});

export const routerActions = routerSlice.actions;
export const routerReducer = routerSlice.reducer;

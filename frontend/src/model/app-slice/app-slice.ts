import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppAuthModes } from './types';

const initialState = {
  authMode: undefined as AppAuthModes,
  isLogin: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    authModeChanged: (state, action: PayloadAction<AppAuthModes>) => {
      state.authMode = action.payload;
    },
  },
  selectors: {
    selectCurrentAuthMode: (state) => state.authMode,
  },
});

export const { name: appSliceName, reducer: appSliceReducer } = appSlice;
export const { authModeChanged } = appSlice.actions;
export const { selectCurrentAuthMode } = appSlice.selectors;

import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { refreshTokenExpired } from '../../api/jwt-auth-api/actions';
import { jwtAuthApi } from '../../api/jwt-auth-api/jwt-auth-api';
import { sessionAuthApi } from '../../api/session-auth-api/session-auth-api';
import type { AppAuthModes } from './types';

const initialState = {
  authMode: undefined as AppAuthModes,
  forceLogoutPath: undefined as undefined | string,
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
  extraReducers: (build) => ({
    userLoggedIn: build.addMatcher(
      isAnyOf(
        jwtAuthApi.endpoints.login.matchFulfilled,
        sessionAuthApi.endpoints.login.matchFulfilled
      ),
      (state) => {
        debugger;

        state.isLogin = true;
      }
    ),
    userLoggedOut: build.addMatcher(
      isAnyOf(
        jwtAuthApi.endpoints.logout.matchPending,
        sessionAuthApi.endpoints.logout.matchPending
      ),
      (state) => {
        state.isLogin = false;
        state.forceLogoutPath = undefined;
      }
    ),
    userForcedToLogout: build.addMatcher(
      isAnyOf(refreshTokenExpired.match),
      (state, action) => {
        state.isLogin = false;
        state.forceLogoutPath = action.payload.logoutURL;
      }
    ),
  }),
  selectors: {
    selectCurrentAuthMode: (state) => state.authMode,
    selectIsLogin: (state) => state.isLogin,
    selectForceLogoutPath: (state) => state.forceLogoutPath,
  },
});

export const { name: appSliceName, reducer: appSliceReducer } = appSlice;
export const { authModeChanged } = appSlice.actions;
export const { selectCurrentAuthMode, selectIsLogin, selectForceLogoutPath } =
  appSlice.selectors;

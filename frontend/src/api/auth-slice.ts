import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './auth-api/auth-api';
import {
  newAccessTokenReceived,
  refreshTokenExpired,
} from './base-api/actions';

const initialState = {
  accessToken: undefined as undefined | string,
  forceLogoutPath: undefined as undefined | string,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => ({
    newAccessTokenReceived: builder.addCase(
      newAccessTokenReceived,
      (state, action) => {
        state.accessToken = action.payload.accessToken;
      }
    ),
    refreshTokenExpired: builder.addCase(
      refreshTokenExpired,
      (state, action) => {
        state.accessToken = undefined;
        state.forceLogoutPath = action.payload.logoutURL;
      }
    ),
    userLoggedIn: builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.accessToken;
      }
    ),
    userLoggedOut: builder.addMatcher(
      isAnyOf(
        authApi.endpoints.logout.matchFulfilled,
        authApi.endpoints.logout.matchRejected
      ),
      () => initialState
    ),
  }),
  selectors: {
    selectIsLogin: (state) => !!state.accessToken,
    selectForceLogoutPath: (state) => state.forceLogoutPath,
  },
});

export const { name: authSliceName, reducer: authSliceReducer } = authSlice;
export const { selectIsLogin, selectForceLogoutPath } = authSlice.selectors;

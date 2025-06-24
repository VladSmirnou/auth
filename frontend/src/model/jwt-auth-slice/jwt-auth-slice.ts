import { createSlice } from '@reduxjs/toolkit';
import { jwtAuthApi } from '../../api/jwt-auth-api/jwt-auth-api';
import {
  newAccessTokenReceived,
  refreshTokenExpired,
} from '../../api/jwt-auth-api/actions';

const initialState = {
  accessToken: undefined as undefined | string,
  forceLogoutPath: undefined as undefined | string,
};

const jwtAuthSlice = createSlice({
  name: 'jwtAuth',
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
      jwtAuthApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.accessToken = action.payload.accessToken;
      }
    ),
    userLoggedOut: builder.addMatcher(
      jwtAuthApi.endpoints.logout.matchPending,
      () => initialState
    ),
  }),
  selectors: {
    selectIsLogin: (state) => !!state.accessToken,
    selectForceLogoutPath: (state) => state.forceLogoutPath,
  },
});

export const { name: jwtAuthSliceName, reducer: jwtAuthSliceReducer } =
  jwtAuthSlice;
export const { selectIsLogin, selectForceLogoutPath } = jwtAuthSlice.selectors;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi, type LoginResponse } from "./auth-api";
import { newAccessTokenReceived, refreshTokenExpired } from "./base-api";

const initialState = {
    accessToken: undefined as undefined | string,
    forceLogoutPath: undefined as undefined | string,
    isLogin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedInAfterForceLogout: state => {
            return { ...state, forceLogoutPath: undefined }
        }
    },
    extraReducers: builder => ({
        newAccessTokenReceived: builder.addCase(
            newAccessTokenReceived,
            (state, action) => {
                if (state.isLogin === false) {
                    state.isLogin = true
                }
                state.accessToken = action.payload.accessToken
            }
        ),
        refreshTokenExpired: builder.addCase(
            refreshTokenExpired,
            (state, action) => {
                return {
                    ...initialState,
                    forceLogoutPath: action.payload.logoutURL
                }
            }
        ),
        userLoggedIn: builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action: PayloadAction<LoginResponse>) => {
                state.accessToken = action.payload.accessToken
                state.isLogin = true
            }
        ),
        userLoggedOut: builder.addMatcher(
            authApi.endpoints.logout.matchPending,
            () => initialState
        )
    }),
})

export const {
    name: authSliceName,
    reducer: authSliceReducer,
} = authSlice;

export const { userLoggedInAfterForceLogout } = authSlice.actions
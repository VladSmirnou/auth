import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { AppState } from '../store/types';
import { createAction } from '@reduxjs/toolkit';
import { Mutex } from 'async-mutex';

type NewAccessTokeReponse = { accessToken: string };
type RefreshTokenExpired = { logoutURL: string };

export const refreshTokenExpired = createAction<RefreshTokenExpired>(
  'refreshTokenExpired'
);
export const newAccessTokenReceived = createAction<NewAccessTokeReponse>(
  'newAccessTokenReceived'
);

const baseUrl = 'http://localhost:3001';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as AppState;
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const preventCycleWrapper = (observedStatus: number) => {
  let previousStatus = undefined as undefined | number;

  return (currentStatus: number) => {
    if (previousStatus === observedStatus && currentStatus === observedStatus) {
      previousStatus = undefined;
      return true;
    }
    previousStatus = currentStatus;
    return false;
  };
};

const preventCycle = preventCycleWrapper(401);

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  //   const responseStatus = result.error?.status || result.meta?.response?.status;

  //   if (typeof responseStatus === 'number') {
  //     const isCycle = preventCycle(responseStatus);
  //     if (isCycle) {
  //         const isLogin = (api.getState() as AppState).auth.isLogin;
  //         if (isLogin && !mutex.isLocked()) {
  //             const release = await mutex.acquire();
  //             try {
  //                 await baseQuery({ url: 'auth/login', method: 'DELETE' }, api, extraOptions);
  //                 api.dispatch(refreshTokenExpired())
  //             } finally {
  //                 release()
  //             }
  //         }
  //         return result
  //     }
  //   }

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          'auth/refresh',
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(
            newAccessTokenReceived(refreshResult.data as NewAccessTokeReponse)
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          const isLogin = (api.getState() as AppState).auth.isLogin;
          if (isLogin) {
            await baseQuery(
              { url: 'auth/login', method: 'DELETE' },
              api,
              extraOptions
            );
            api.dispatch(
              refreshTokenExpired({
                logoutURL: window.location.pathname + window.location.search,
              })
            );
          }
        }
      } finally {
        release();
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'base',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import type { AppState } from '../../store/types';
import { BASE_API_URLS } from './urls';
import { newAccessTokenReceived, refreshTokenExpired } from './actions';
import type { NewAccessTokeReponse } from './types';
import { StatusCodes } from '../shared/status-codes';
import { not } from '../../shared/utils/not';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URLS.BASE_API_URL,
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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === StatusCodes.UNAUTHORIZED) {
    if (not(mutex.isLocked())) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          BASE_API_URLS.REFRESH_TOKEN,
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(
            newAccessTokenReceived(refreshResult.data as NewAccessTokeReponse)
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          const isLogin = (api.getState() as AppState).auth.accessToken;
          if (isLogin) {
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
  catchSchemaFailure: (error) => {
    return {
      status: 'CUSTOM_ERROR' as const,
      error: `${error.schemaName} failed validation`,
      data: error.message,
    };
  },
  endpoints: () => ({}),
});

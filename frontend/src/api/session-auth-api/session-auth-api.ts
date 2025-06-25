import { sessionBaseApi } from './session-base-api';
import {
  sessionLoginArgsSchema,
  sessionSignupArgsSchema,
} from './schemas/endpoint-args-schemas';
import type { SessionLoginArgs, SessionSignupArgs } from './types';
import { SESSION_API_URLS } from './urls';

export const sessionAuthApi = sessionBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, SessionLoginArgs>({
      query: (data) => ({
        url: SESSION_API_URLS.LOGIN,
        method: 'POST',
        body: data,
        responseHandler: 'content-type',
      }),
      argSchema: sessionLoginArgsSchema,
    }),
    signup: build.mutation<void, SessionSignupArgs>({
      query: (data) => ({
        url: SESSION_API_URLS.SIGNUP,
        method: 'POST',
        body: data,
      }),
      argSchema: sessionSignupArgsSchema,
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: SESSION_API_URLS.LOGIN,
        method: 'DELETE',
        responseHandler: 'text',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignupMutation } =
  sessionAuthApi;

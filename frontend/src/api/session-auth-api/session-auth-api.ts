import { sessionBaseApi } from './session-base-api';
import {
  sessionLoginArgsSchema,
  sessionSignupArgsSchema,
} from './schemas/endpoint-args-schemas';
import type { SessionLoginArgs, SessionSignupArgs } from './types';
import { SESSION_API_URLS } from './urls';

const authSessionApi = sessionBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, SessionLoginArgs>({
      query: (data) => ({
        url: SESSION_API_URLS.LOGIN,
        method: 'POST',
        body: data,
        responseHandler: 'text',
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
    logout: build.query<void, void>({
      query: () => ({
        url: SESSION_API_URLS.LOGIN,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutQuery, useSignupMutation } =
  authSessionApi;

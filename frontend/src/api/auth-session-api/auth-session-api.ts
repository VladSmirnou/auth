import { baseApi } from '../base-api/base-api';
import {
  sessionLoginArgsSchema,
  sessionSignupArgsSchema,
} from './schemas/endpoint-args-schemas';
import type { SessionLoginArgs, SessionSignupArgs } from './types';

const authSessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sessionLogin: build.mutation<void, SessionLoginArgs>({
      query: (data) => '',
      argSchema: sessionLoginArgsSchema,
    }),
    sessionSignup: build.mutation<void, SessionSignupArgs>({
      query: (data) => '',
      argSchema: sessionSignupArgsSchema,
    }),
    sessionLogout: build.query<void, void>({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSessionLoginMutation,
  useSessionLogoutQuery,
  useSessionSignupMutation,
} = authSessionApi;

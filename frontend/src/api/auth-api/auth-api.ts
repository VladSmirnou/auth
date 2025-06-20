import { baseApi } from '../base-api';
import {
  loginArgsSchema,
  loginResponseSchema,
  signupArgsSchema,
} from './schemas/endpoint-args-schemas';
import {
  loginFormErrorResponseSchema,
  signupFormErrorResponseSchema,
} from './schemas/field-error-schemas';
import type { LoginArgs, LoginResponse, SignupArgs } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      argSchema: loginArgsSchema,
      responseSchema: loginResponseSchema,
      transformErrorResponse: (error) => {
        const parsedError = loginFormErrorResponseSchema.safeParse(error.data);
        if (parsedError.success) {
          return parsedError.data.errors;
        }
        return error;
      },
    }),
    signup: build.mutation<void, SignupArgs>({
      query: (data) => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
      }),
      argSchema: signupArgsSchema,
      transformErrorResponse: (error) => {
        const parsedError = signupFormErrorResponseSchema.safeParse(error.data);
        if (parsedError.success) {
          return parsedError.data.errors;
        }
        return error;
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/login',
        method: 'DELETE',
      }),
    }),
    isLogin: build.query<void, void>({
      query: () => 'auth/login',
    }),
  }),
});

export const {
  useIsLoginQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;

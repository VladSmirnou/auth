import { jwtBaseApi } from './jwt-base-api';
import {
  loginArgsSchema,
  loginResponseSchema,
  signupArgsSchema,
} from './schemas/endpoint-args-schemas';
import {
  loginFormErrorResponseSchema,
  signupFormErrorResponseSchema,
} from './schemas/field-error-schemas';
import { JWT_API_URLS } from './urls';
import type { LoginArgs, LoginResponse, SignupArgs } from './types';

export const jwtAuthApi = jwtBaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (data) => ({
        url: JWT_API_URLS.LOGIN,
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
        url: JWT_API_URLS.SIGNUP,
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
        url: JWT_API_URLS.LOGIN,
        method: 'DELETE',
        responseHandler: 'content-type',
      }),
    }),
    isLogin: build.query<void, void>({
      query: () => ({
        url: JWT_API_URLS.LOGIN,
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useIsLoginQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = jwtAuthApi;

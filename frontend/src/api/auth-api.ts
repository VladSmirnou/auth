import {
  loginFormFieldErrorsSchema,
  signupFormFieldErrorsSchema,
} from './schemas/fieldErrorSchema';
import { baseApi } from './base-api';

export type LoginResponse = {
  accessToken: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type SignupRequest = {
  email: string;
  password: string;
  username: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (error) => {
        const parsedError = loginFormFieldErrorsSchema.safeParse(error.data);
        if (parsedError.success) {
          return parsedError.data.errors;
        }
        return error;
      },
    }),
    signup: build.mutation<void, SignupRequest>({
      query: (data) => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: (error) => {
        const parsedError = signupFormFieldErrorsSchema.safeParse(error.data);
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

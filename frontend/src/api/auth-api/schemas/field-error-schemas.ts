import { z } from 'zod/v4';
import { LOGIN_FIELDS, SIGNUP_FIELDS } from './constants';
import type { Fields } from './types';

const getResponseErrorsSchema = <T extends Fields>(fields: T) => {
  return z.array(
    z.object({
      field: z.literal(fields),
      message: z.string(),
    })
  );
};

export const loginFormFieldErrorsSchema = getResponseErrorsSchema(LOGIN_FIELDS);
export const signupFormFieldErrorsSchema =
  getResponseErrorsSchema(SIGNUP_FIELDS);

export const loginFormErrorResponseSchema = z.object({
  errors: loginFormFieldErrorsSchema,
});

export const signupFormErrorResponseSchema = z.object({
  errors: signupFormFieldErrorsSchema,
});

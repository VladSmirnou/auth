import { z } from 'zod/v4';
import { LOGIN_FIELDS, SIGNUP_FIELDS } from './constants';
import { getResponseErrorsSchema } from '../../utils/get-response-error-schema';

export const loginFormFieldErrorsSchema = getResponseErrorsSchema(LOGIN_FIELDS);
export const signupFormFieldErrorsSchema =
  getResponseErrorsSchema(SIGNUP_FIELDS);

export const loginFormErrorResponseSchema = z.object({
  errors: loginFormFieldErrorsSchema,
});

export const signupFormErrorResponseSchema = z.object({
  errors: signupFormFieldErrorsSchema,
});

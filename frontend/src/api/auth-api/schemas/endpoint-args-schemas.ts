import { z } from 'zod/v4';
import {
  INVALID_FIELD_MESSAGES,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGHT,
  MAX_USERNAME_LENGTH,
} from './constants';

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const emailSchema = z.email(INVALID_FIELD_MESSAGES.INVALID_EMAIL_ADDRESS);
const passwordSchema = z
  .string()
  .trim()
  .min(MIN_PASSWORD_LENGTH, INVALID_FIELD_MESSAGES.INVALID_PASSWORD_LENGTH)
  .max(MAX_PASSWORD_LENGTH, INVALID_FIELD_MESSAGES.INVALID_PASSWORD_LENGTH);

export const loginArgsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupArgsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: z
    .string()
    .trim()
    .min(MIN_USERNAME_LENGHT, INVALID_FIELD_MESSAGES.USERNAME_REQUIRED)
    .max(MAX_USERNAME_LENGTH, INVALID_FIELD_MESSAGES.USERNAME_MAX_LENGTH),
});

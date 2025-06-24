import { z } from 'zod/v4';
import { emailPattern, passwordPattern } from './patterns';
import {
  INVALID_FIELD_MESSAGES,
  MAX_USERNAME_LENGHT,
  MIN_USERNAME_LENGTH,
} from './constants';

export const emailSchema = z.email({
  pattern: emailPattern,
  error: INVALID_FIELD_MESSAGES.INVALID_EMAIL_ADDRESS,
});

export const usernameSchema = z
  .string()
  .trim()
  .min(MIN_USERNAME_LENGTH, INVALID_FIELD_MESSAGES.INVALID_USERNAME)
  .max(MAX_USERNAME_LENGHT, INVALID_FIELD_MESSAGES.INVALID_USERNAME);

export const passwordSchema = z
  .string()
  .regex(passwordPattern, INVALID_FIELD_MESSAGES.INVALID_PASSWORD);

import { INVALID_PASSWORD_LENGTH_MESSAGE } from './constants';
import z from 'zod/v4';

export const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, INVALID_PASSWORD_LENGTH_MESSAGE)
    .max(40, INVALID_PASSWORD_LENGTH_MESSAGE),
});

export const loginFieldsErrorsSchema = z.array(
  z.object({
    field: z.literal(['email', 'password']),
    message: z.string(),
  })
);

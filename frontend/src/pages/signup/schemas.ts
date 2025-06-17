import { INVALID_PASSWORD_LENGTH_MESSAGE } from './constants';
import z from 'zod/v4';

export const signupFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, INVALID_PASSWORD_LENGTH_MESSAGE)
    .max(40, INVALID_PASSWORD_LENGTH_MESSAGE),
  username: z
    .string()
    .min(1, 'Username cannot be empty')
    .max(20, 'Username cannot be longer that 20 characters'),
});

export const signupFieldsErrorsSchema = z.array(
  z.object({
    field: z.literal(['email', 'password', 'username']),
    message: z.string(),
  })
);

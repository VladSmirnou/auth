import { z } from 'zod/v4';
import { emailSchema, passwordSchema, usernameSchema } from './field-schemas';

export const sessionLoginArgsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const sessionSignupArgsSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

import { INVALID_FIELD_MESSAGES } from './constants';
import { sessionSignupArgsSchema } from './endpoint-args-schemas';
import { z } from 'zod/v4';

export const sessionSignupFormDataSchema = sessionSignupArgsSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: INVALID_FIELD_MESSAGES.INVALID_CONFIRM_PASSWORD,
    path: ['confirmPassword'],
  });

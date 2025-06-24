import { z } from 'zod/v4';
import type {
  sessionLoginArgsSchema,
  sessionSignupArgsSchema,
} from './schemas/endpoint-args-schemas';
import { sessionSignupFormDataSchema } from './schemas/form-data-schema';

export type SessionSignupFormDataSchemaType = z.infer<
  typeof sessionSignupFormDataSchema
>;
export type SessionLoginArgs = z.infer<typeof sessionLoginArgsSchema>;
export type SessionSignupArgs = z.infer<typeof sessionSignupArgsSchema>;

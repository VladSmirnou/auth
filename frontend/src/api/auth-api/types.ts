import { z } from 'zod/v4';
import type {
  loginArgsSchema,
  loginResponseSchema,
  signupArgsSchema,
} from './schemas/endpoint-args-schemas';

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type LoginArgs = z.infer<typeof loginArgsSchema>;

export type SignupArgs = z.infer<typeof signupArgsSchema>;

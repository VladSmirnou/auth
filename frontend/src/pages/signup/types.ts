import type z from 'zod/v4';
import type { signupFormSchema } from './schemas';

export type SignupFormData = z.infer<typeof signupFormSchema>;

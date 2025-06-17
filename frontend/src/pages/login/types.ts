import type z from 'zod/v4';
import type { loginFormSchema } from './schemas';

export type LoginFormData = z.infer<typeof loginFormSchema>;

import type z from 'zod/v4';
import type { cardsSchema } from './schemas';

export type Cards = z.infer<typeof cardsSchema>;

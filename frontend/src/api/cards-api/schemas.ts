import { z } from 'zod/v4';

const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const cardsSchema = z.array(cardSchema);

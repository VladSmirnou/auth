import { z } from 'zod/v4';

export const getResponseErrorsSchema = <T extends string>(
  fields: readonly T[]
) => {
  return z.array(
    z.object({
      field: z.literal(fields),
      message: z.string(),
    })
  );
};

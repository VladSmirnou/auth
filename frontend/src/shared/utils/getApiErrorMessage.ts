import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import z from 'zod/v4';

export const genericApiErrorSchema = z.object({
  error: z.string(),
});

export const getApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError
) => {
  let errorMessage = '';
  if ('status' in error) {
    if ('error' in error) {
      errorMessage = error.error;
    } else {
      const isGenericError = genericApiErrorSchema.safeParse(error.data);
      if (isGenericError.success) {
        errorMessage = isGenericError.data.error;
      } else {
        errorMessage = JSON.stringify(error.data);
      }
    }
  } else {
    errorMessage = error.message ?? 'Unknown error occured';
  }

  return errorMessage;
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SESSION_API_URLS } from './urls';

export const sessionBaseApi = createApi({
  reducerPath: 'session-base',
  baseQuery: fetchBaseQuery({
    baseUrl: SESSION_API_URLS.BASE,
    credentials: 'include',
  }),
  catchSchemaFailure: (error) => {
    return {
      status: 'CUSTOM_ERROR' as const,
      error: `${error.schemaName} failed validation`,
      data: error.message,
    };
  },
  endpoints: () => ({}),
});

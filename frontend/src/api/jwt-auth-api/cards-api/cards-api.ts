import { jwtBaseApi } from '../jwt-base-api';
import { cardsSchema } from './schemas';
import type { Cards } from './types';

const cardsApi = jwtBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<Cards, void>({
      query: () => 'cards/allCards',
      keepUnusedDataFor: 0,
      responseSchema: cardsSchema,
    }),
  }),
});

export const { useGetCardsQuery } = cardsApi;

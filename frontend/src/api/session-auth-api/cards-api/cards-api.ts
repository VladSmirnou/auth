import { cardsSchema } from '../../shared/cards-api/schemas';
import type { Cards } from '../../shared/cards-api/types';
import { sessionAuthApi } from '../session-auth-api';
import { CARDS_API_URLS } from './urls';

const sessionCardsApi = sessionAuthApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<Cards, void>({
      query: () => CARDS_API_URLS.CARDS,
      keepUnusedDataFor: 0,
      responseSchema: cardsSchema,
    }),
  }),
});

export const { useGetCardsQuery } = sessionCardsApi;

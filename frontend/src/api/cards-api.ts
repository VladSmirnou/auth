import { baseApi } from './base-api';

type Cards = Array<{ id: number; title: string }>;

const cardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query<Cards, void>({
      query: () => 'cards/allCards',
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetCardsQuery } = cardsApi;

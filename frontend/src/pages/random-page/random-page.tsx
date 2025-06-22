import { useGetCardsQuery } from '../../api/cards-api/cards-api';

export const RandomPage = () => {
  useGetCardsQuery();
  return (
    <div>
      <h1>Random page</h1>
    </div>
  );
};

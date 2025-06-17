import { data } from 'react-router-dom';
import { useGetCardsQuery } from '../../api/cards-api';
import { Container } from '../../components/container/container';
import { Loader } from '../../components/loader/loader';
import { Section } from '../../components/section/section';
import { Card } from './card/card';
import styles from './cards.module.css';

export const Cards = () => {
  const {
    data: cards = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetCardsQuery();

  let content;
  if (isLoading || isFetching) {
    content = <Loader />;
  } else if (isSuccess) {
    content = cards.length ? (
      cards.map(({ title, id }) => {
        return <Card key={id} title={title} />;
      })
    ) : (
      <p>You dont have any cards yet</p>
    );
  }
  return (
    <Section>
      <Container>
        <h1>App page</h1>
        <div className={styles.cards_container}>{content}</div>
      </Container>
    </Section>
  );
};

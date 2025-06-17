import { CardProps } from './types';

export const Card = ({ title }: CardProps) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  );
};

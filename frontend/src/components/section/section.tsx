import { SectionProps } from './types';
import cn from 'classnames';
import styles from './section.module.css';

export const Section = ({ className, ...rest }: SectionProps) => {
  return <section className={cn(styles.section, className)} {...rest} />;
};

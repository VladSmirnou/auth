import { ButtonProps } from './types';
import styles from './button.module.css';

export const Button = (props: ButtonProps) => {
  return <button {...props} className={styles.button} />;
};

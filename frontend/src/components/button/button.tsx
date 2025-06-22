import { ButtonProps } from './types';
import cn from 'classnames';
import styles from './button.module.css';

export const Button = ({ className, ...rest }: ButtonProps) => {
  return <button {...rest} className={cn(styles.button, className)} />;
};

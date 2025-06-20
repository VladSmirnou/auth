import { InputProps } from './types';
import styles from './input.module.css';
import cn from 'classnames';

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      type="text"
      autoComplete="on"
      className={cn(styles.input, className)}
      {...rest}
    />
  );
};

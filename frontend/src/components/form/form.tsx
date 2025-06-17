import { FormProps } from 'react-router-dom';
import cn from 'classnames';
import styles from './form.module.css';

export const Form = ({ className, noValidate, ...rest }: FormProps) => {
  return (
    <form
      className={cn(className, styles.form)}
      noValidate={noValidate ?? true}
      {...rest}
    />
  );
};

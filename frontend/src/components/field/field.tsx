import { FieldProps } from './types';
import styles from './field.module.css';
import { RequiredHint } from '../required-hint/required-hint';

export const Field = <T extends string>({
  id,
  redernField: renderField,
  label,
  error,
  required = true,
}: FieldProps<T>) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.required_container}>
        {renderField(id)}
        {required && <RequiredHint />}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

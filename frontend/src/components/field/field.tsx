import { FieldProps } from './types';
import style from './field.module.css';

export const Field = <T extends string>({
  id,
  redernField: renderField,
  label,
  error,
}: FieldProps<T>) => {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {renderField(id)}
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

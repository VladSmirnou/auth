import type { ReactElement } from 'react';

export type FieldProps<T> = {
  label?: string;
  error?: string;
  id: T;
  redernField: (id: T) => ReactElement;
  required?: boolean;
};

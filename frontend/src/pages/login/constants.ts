import {
  EMAIL_FIELD,
  PASSWORD_FIELD,
} from '../../shared/constants/form-fields';
import type { LoginArgs } from '../../api/auth-api/types';

export const DEFAULT_FORM_DATA: LoginArgs = {
  [EMAIL_FIELD]: '',
  [PASSWORD_FIELD]: '',
};

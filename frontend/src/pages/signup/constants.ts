import {
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from '../../shared/constants/form-fields';
import type { SignupArgs } from '../../api/jwt-auth-api/types';

export const DEFAULT_FORM_DATA: SignupArgs = {
  [EMAIL_FIELD]: '',
  [PASSWORD_FIELD]: '',
  [USERNAME_FIELD]: '',
};

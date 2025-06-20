import {
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from '../../api/auth-api/schemas/constants';
import type { SignupArgs } from '../../api/auth-api/types';

export const DEFAULT_FORM_DATA: SignupArgs = {
  [EMAIL_FIELD]: '',
  [PASSWORD_FIELD]: '',
  [USERNAME_FIELD]: '',
};

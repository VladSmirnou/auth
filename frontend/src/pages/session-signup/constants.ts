import type { SessionSignupFormDataSchemaType } from '../../api/session-auth-api/types';
import {
  CONFIRM_PASSWORD_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from '../../shared/constants/form-fields';

export const DEFAULT_FORM_DATA: SessionSignupFormDataSchemaType = {
  [USERNAME_FIELD]: '',
  [EMAIL_FIELD]: '',
  [PASSWORD_FIELD]: '',
  [CONFIRM_PASSWORD_FIELD]: '',
};

import type { SessionLoginArgs } from '../../api/auth-session-api/types';
import {
  EMAIL_FIELD,
  PASSWORD_FIELD,
} from '../../shared/constants/form-fields';

export const DEFAULT_FORM_DATA: SessionLoginArgs = {
  [EMAIL_FIELD]: '',
  [PASSWORD_FIELD]: '',
};

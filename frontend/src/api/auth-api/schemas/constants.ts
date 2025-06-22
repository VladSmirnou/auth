import {
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from '../../../shared/constants/form-fields';

export const INVALID_FIELD_MESSAGES = {
  INVALID_PASSWORD_LENGTH:
    'Invalid password length, must be min 8 and max 40 characters long.',
  INVALID_EMAIL_ADDRESS: 'Must be a valid email address.',
  USERNAME_REQUIRED: 'Username cannot be empty',
  USERNAME_MAX_LENGTH: 'Username cannot be longer that 20 characters',
};

export const LOGIN_FIELDS = [EMAIL_FIELD, PASSWORD_FIELD];
export const SIGNUP_FIELDS = [EMAIL_FIELD, PASSWORD_FIELD, USERNAME_FIELD];

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 40;

export const MIN_USERNAME_LENGHT = 1;
export const MAX_USERNAME_LENGTH = 20;

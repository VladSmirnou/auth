import {
  CONFIRM_PASSWORD_FIELD,
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
} from '../../../shared/constants/form-fields';

export const MIN_USERNAME_LENGTH = 1;
export const MAX_USERNAME_LENGHT = 20;

export const INVALID_FIELD_MESSAGES = {
  INVALID_PASSWORD:
    'Invalid password, must be 8-20 characters long and contain only "a-z", "A-Z", "0-9", "_!@#$%^&*()-" characters',
  INVALID_CONFIRM_PASSWORD: "Password doesn't match",
  INVALID_EMAIL_ADDRESS: 'Only google email addresses are valid',
  INVALID_USERNAME: `Invalid username, must be ${MIN_USERNAME_LENGTH}-${MAX_USERNAME_LENGHT} characters long`,
};

export const LOGIN_FIELDS = [EMAIL_FIELD, PASSWORD_FIELD];
export const SIGNUP_FIELDS = [
  EMAIL_FIELD,
  PASSWORD_FIELD,
  USERNAME_FIELD,
  CONFIRM_PASSWORD_FIELD,
];

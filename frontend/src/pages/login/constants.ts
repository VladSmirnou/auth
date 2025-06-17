import type { LoginFormData } from "./types";

export const INVALID_PASSWORD_LENGTH_MESSAGE =
  'Invalid password length, must be min 8 and max 40 characters long.';

export const DEFAULT_FORM_DATA: LoginFormData = {
  email: '',
  password: '',
};
  
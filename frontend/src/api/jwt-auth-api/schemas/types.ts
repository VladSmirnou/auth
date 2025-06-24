import type { LOGIN_FIELDS, SIGNUP_FIELDS } from './constants';

export type Fields = typeof LOGIN_FIELDS | typeof SIGNUP_FIELDS;

import { z } from 'zod/v4';

export const loginFormFieldErrorsSchema = z.object({
  errors: z
    .array(
      z.object({
        path: z.literal(['email', 'password']),
        msg: z.string(),
      })
    )
    .transform((errors) => {
      return errors.map(({ path, msg }) => {
        return { field: path, message: msg };
      });
    }),
});

export const signupFormFieldErrorsSchema = z.object({
  errors: z
    .array(
      z.object({
        path: z.literal(['email', 'password', 'username']),
        msg: z.string(),
      })
    )
    .transform((errors) => {
      return errors.map(({ path, msg }) => {
        return { field: path, message: msg };
      });
    }),
});

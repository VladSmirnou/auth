import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/session-auth-api/session-auth-api';
import { AppLink } from '../../components/app-link/app-link';
import { Button } from '../../components/button/button';
import { Container } from '../../components/container/container';
import { Field } from '../../components/field/field';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input/input';
import { Section } from '../../components/section/section';
import { APP_ROUTES } from '../../router/constants/app-routes';
// import styles from './signup.module.css';
import { sessionSignupFormDataSchema } from '../../api/session-auth-api/schemas/form-data-schema';
import type { SessionSignupFormDataSchemaType } from '../../api/session-auth-api/types';
import { DEFAULT_FORM_DATA } from './constants';

export const SessionSignup = () => {
  const navigate = useNavigate();

  const [signupTrigger] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<SessionSignupFormDataSchemaType>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: zodResolver(sessionSignupFormDataSchema),
  });

  const onSubmit: SubmitHandler<SessionSignupFormDataSchemaType> = async (
    data
  ) => {
    console.log(data);
    // const res = await signupTrigger(data);

    // if (res.error) {
    //   const fieldsError = signupFormFieldErrorsSchema.safeParse(res.error);
    //   if (fieldsError.success) {
    //     fieldsError.data.forEach(({ field, message }) => {
    //       setError(field, { message });
    //     });
    //   } else {
    //     const errorMessage = getApiErrorMessage(res.error);
    //     toast.error(errorMessage, {
    //       position: 'bottom-right',
    //       pauseOnHover: false,
    //       pauseOnFocusLoss: false,
    //     });
    //   }
    // } else {
    //   navigate(APP_ROUTES.userCreated, { replace: true });
    // }
  };

  return (
    <Section>
      <Container>
        <h1>Signup</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field
            id="username"
            error={errors.username?.message}
            redernField={(id) => (
              <Input
                type="text"
                autoComplete="off"
                autoFocus
                id={id}
                placeholder={id}
                {...register(id)}
              />
            )}
          />
          <Field
            id="email"
            error={errors.email?.message}
            redernField={(id) => (
              <Input
                type="email"
                autoComplete="off"
                id={id}
                placeholder={id}
                {...register(id)}
              />
            )}
          />
          <Field
            id="password"
            error={errors.password?.message}
            redernField={(id) => (
              <Input
                type="password"
                autoComplete="off"
                id={id}
                placeholder={id}
                {...register(id)}
              />
            )}
          />
          <Field
            id="confirmPassword"
            error={errors.confirmPassword?.message}
            redernField={(id) => (
              <Input
                type="password"
                autoComplete="off"
                id={id}
                placeholder="confirm password"
                {...register(id)}
              />
            )}
          />
          <Button type="submit" disabled={!isDirty || !isValid}>
            signin
          </Button>
        </Form>
        <AppLink to={APP_ROUTES.login}>Already have an account?</AppLink>
      </Container>
    </Section>
  );
};

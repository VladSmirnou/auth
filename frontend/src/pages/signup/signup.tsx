import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/jwt-auth-api/jwt-auth-api';
import { Button } from '../../components/button/button';
import { Container } from '../../components/container/container';
import { Field } from '../../components/field/field';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input/input';
import { AppLink } from '../../components/app-link/app-link';
import { Section } from '../../components/section/section';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { DEFAULT_FORM_DATA } from './constants';
import styles from './signup.module.css';
import { toast } from 'react-toastify';
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage';
import { signupFormFieldErrorsSchema } from '../../api/jwt-auth-api/schemas/field-error-schemas';
import { signupArgsSchema } from '../../api/jwt-auth-api/schemas/endpoint-args-schemas';
import type { SignupArgs } from '../../api/jwt-auth-api/types';

export const Signup = () => {
  const navigate = useNavigate();

  const [signupTrigger] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
  } = useForm<SignupArgs>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: zodResolver(signupArgsSchema),
  });

  const onSubmit: SubmitHandler<SignupArgs> = async (data) => {
    const res = await signupTrigger(data);

    if (res.error) {
      const fieldsError = signupFormFieldErrorsSchema.safeParse(res.error);
      if (fieldsError.success) {
        fieldsError.data.forEach(({ field, message }) => {
          setError(field, { message });
        });
      } else {
        const errorMessage = getApiErrorMessage(res.error);
        toast.error(errorMessage, {
          position: 'bottom-right',
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    } else {
      navigate(APP_ROUTES.userCreated, { replace: true });
    }
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
                id={id}
                autoFocus
                autoComplete="off"
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
          <Button type="submit" disabled={!isDirty || !isValid}>
            signin
          </Button>
        </Form>
        <AppLink to={APP_ROUTES.login} className={styles.link}>
          Already have an account?
        </AppLink>
      </Container>
    </Section>
  );
};

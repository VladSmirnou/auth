import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../api/auth-api';
import { Button } from '../../components/button/button';
import { Container } from '../../components/container/container';
import { Field } from '../../components/field/field';
import { Form } from '../../components/form/form';
import { Input } from '../../components/input/input';
import { AppLink } from '../../components/link/link';
import { Section } from '../../components/section/section';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { getApiErrorMessage } from '../../shared/utils/getApiErrorMessage';
import { DEFAULT_FORM_DATA } from './constants';
import { loginFieldsErrorsSchema, loginFormSchema } from './schemas';
import type { LoginFormData } from './types';
import styles from './login.module.css';

export const Login = () => {
  const [loginTrigger] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: DEFAULT_FORM_DATA,
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const res = await loginTrigger(data);
    if (res.error) {
      const fieldsError = loginFieldsErrorsSchema.safeParse(res.error);
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
    }
  };

  return (
    <Section>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field
            id="email"
            error={errors.email?.message}
            redernField={(id) => (
              <Input id={id} type="email" placeholder={id} {...register(id)} />
            )}
          />
          <Field
            id="password"
            error={errors.password?.message}
            redernField={(id) => (
              <Input
                id={id}
                type="password"
                placeholder={id}
                {...register(id)}
              />
            )}
          />
          <Button type="submit">login</Button>
        </Form>
        <AppLink to={APP_ROUTES.signup} className={styles.link}>
          Create a new account
        </AppLink>
      </Container>
    </Section>
  );
};

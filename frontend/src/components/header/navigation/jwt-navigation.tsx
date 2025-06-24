import { useLogoutMutation } from '../../../api/jwt-auth-api/jwt-auth-api';
import { useAppSelector } from '../../../hooks/typed-react-redux-hooks';
import { selectIsLogin } from '../../../model/jwt-auth-slice/jwt-auth-slice';
import { APP_ROUTES } from '../../../router/constants/app-routes';
import { not } from '../../../shared/utils/not';
import { Button } from '../../button/button';
import { AppLink } from '../../app-link/app-link';
import styles from './navigation.module.css';

export const Navigation = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <>
      {isLogin && (
        <>
          <li>
            <AppLink to={APP_ROUTES.randomPage}>Random page</AppLink>
          </li>
          <li>
            <AppLink to={APP_ROUTES.cards}>Cards</AppLink>
          </li>
        </>
      )}
    </>
  );
};

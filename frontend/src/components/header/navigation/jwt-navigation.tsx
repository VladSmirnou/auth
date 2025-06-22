import { useLogoutMutation } from '../../../api/auth-api/auth-api';
import { useAppSelector } from '../../../hooks/typed-react-redux-hooks';
import { selectIsLogin } from '../../../model/auth-slice/auth-slice';
import { APP_ROUTES } from '../../../router/constants/app-routes';
import { not } from '../../../shared/utils/not';
import { Button } from '../../button/button';
import { AppLink } from '../../link/link';
import styles from './navigation.module.css';

export const JWTNavigation = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <>
      {isLogin && (
        <div className={styles.private_links_container}>
          <li>
            <AppLink to={APP_ROUTES.randomPage}>Random page</AppLink>
          </li>
          <li>
            <AppLink to={APP_ROUTES.cards}>Cards</AppLink>
          </li>
        </div>
      )}
      <div className={styles.auth_links_container}>
        {not(isLogin) && (
          <>
            <li>
              <AppLink to={APP_ROUTES.login}>Login</AppLink>
            </li>
            <li>
              <AppLink to={APP_ROUTES.signup}>Signup</AppLink>
            </li>
          </>
        )}
        {isLogin && (
          <li>
            <Button onClick={handleLogout}>logout</Button>
          </li>
        )}
      </div>
    </>
  );
};

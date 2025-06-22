import { APP_ROUTES } from '../../../router/constants/app-routes';
import { not } from '../../../shared/utils/not';
import { Button } from '../../button/button';
import { AppLink } from '../../link/link';
import styles from './navigation.module.css';

export const SessionNavigation = () => {
  const isLogin = false;

  return (
    <>
      {isLogin && <div className={styles.private_links_container}></div>}
      <div className={styles.auth_links_container}>
        {not(isLogin) && (
          <>
            <li>
              <AppLink to={APP_ROUTES.sessionLogin}>Login</AppLink>
            </li>
            <li>
              <AppLink to={APP_ROUTES.sessionSignup}>Signup</AppLink>
            </li>
          </>
        )}
        {isLogin && (
          <li>
            <Button>logout</Button>
          </li>
        )}
      </div>
    </>
  );
};

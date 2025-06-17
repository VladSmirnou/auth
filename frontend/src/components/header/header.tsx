import { useLogoutMutation } from '../../api/auth-api';
import { useAppSelector } from '../../hooks/hooks';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { Button } from '../button/button';
import { Container } from '../container/container';
import { AppLink } from '../link/link';
import styles from './header.module.css';

export const Header = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <ul className={styles.link_list}>
            <li>
              <AppLink to={APP_ROUTES.root}>Home</AppLink>
            </li>
            {isLogin && (
              <div className={styles.private_links_container}>
                <li>
                  <AppLink to={APP_ROUTES.cards}>Cards</AppLink>
                </li>
              </div>
            )}
            <div className={styles.auth_links_container}>
              <li>
                <AppLink to={APP_ROUTES.login}>Login</AppLink>
              </li>
              <li>
                <AppLink to={APP_ROUTES.signup}>Signup</AppLink>
              </li>
              {isLogin && (
                <li>
                  <Button onClick={handleLogout}>logout</Button>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

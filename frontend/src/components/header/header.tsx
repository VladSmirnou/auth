import type { FunctionComponent } from 'react';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import {
  selectCurrentAuthMode,
  selectIsLogin,
} from '../../model/app-slice/app-slice';
import type { AuthModes } from '../../model/app-slice/types';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { AppLink } from '../app-link/app-link';
import { Container } from '../container/container';
import { JwtLogoutButton } from './jwt-logout-button/jwt-logout-button';
import { SessionLogoutButton } from './session-logout-button/session-logout-button';
import styles from './header.module.css';

type Props = {
  authMode: AuthModes;
};

const logoutButtonComponents: Record<AuthModes, FunctionComponent> = {
  JWT: JwtLogoutButton,
  session: SessionLogoutButton,
};

const AuthLinks = () => {
  return (
    <ul className={styles.auth_links_container}>
      <li>
        <AppLink to={APP_ROUTES.login}>Login</AppLink>
      </li>
      <li>
        <AppLink to={APP_ROUTES.signup}>Signup</AppLink>
      </li>
    </ul>
  );
};

const ResourceLinks = ({ authMode }: Props) => {
  const LogoutButton = logoutButtonComponents[authMode];
  return (
    <>
      <ul className={styles.resources_links_container}>
        <li>
          <AppLink to={APP_ROUTES.randomPage}>Random page</AppLink>
        </li>
        <li>
          <AppLink to={APP_ROUTES.cards}>Cards</AppLink>
        </li>
      </ul>
      <LogoutButton />
    </>
  );
};

const AppLinks = () => {
  // const isLogin = true;
  const isLogin = useAppSelector(selectIsLogin);
  const authMode = useAppSelector(selectCurrentAuthMode);

  console.log(isLogin);

  if (authMode) {
    return isLogin ? <ResourceLinks authMode={authMode} /> : <AuthLinks />;
  }
  return null;
};

const AppNavigation = () => {
  return (
    <nav>
      <ul className={styles.link_list}>
        <li>
          <AppLink to={APP_ROUTES.root}>Home</AppLink>
        </li>
        <AppLinks />
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <AppNavigation />
      </Container>
    </header>
  );
};

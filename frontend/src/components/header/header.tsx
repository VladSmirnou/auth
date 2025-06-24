import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectCurrentAuthMode } from '../../model/app-slice/app-slice';
import type { AuthModes } from '../../model/app-slice/types';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { Container } from '../container/container';
import { AppLink } from '../app-link/app-link';
// import { JWTNavigation } from './navigation/jwt-navigation';
import { selectIsLogin } from '../../model/jwt-auth-slice/jwt-auth-slice';
import { Button } from '../button/button';
import styles from './header.module.css';
import { not } from '../../shared/utils/not';

// const navigation: Record<AuthModes, FunctionComponent> = {
//   JWT: JWTNavigation,
//   session: SessionNavigation,
// };

type Props = {
  authMode: AuthModes;
};

const LogoutButton = (props: Props) => {
  return <Button className={styles.logout_button}>logout</Button>;
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
      <LogoutButton authMode={authMode} />
    </>
  );
};

const AppLinks = () => {
  const isLogin = useAppSelector(selectIsLogin);
  const authMode = useAppSelector(selectCurrentAuthMode);

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

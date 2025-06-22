import type { FunctionComponent } from 'react';
import { useAppSelector } from '../../hooks/typed-react-redux-hooks';
import { selectCurrentAuthMode } from '../../model/app-slice/app-slice';
import type { AuthModes } from '../../model/app-slice/types';
import { APP_ROUTES } from '../../router/constants/app-routes';
import { Container } from '../container/container';
import { AppLink } from '../link/link';
import { JWTNavigation } from './navigation/jwt-navigation';
import { SessionNavigation } from './navigation/session-navigation';
import styles from './header.module.css';

const navigation: Record<AuthModes, FunctionComponent> = {
  JWT: JWTNavigation,
  session: SessionNavigation,
};

const AppNavigation = () => {
  const authMode = useAppSelector(selectCurrentAuthMode);

  if (!authMode) return null;

  const Navigation = navigation[authMode];

  return <Navigation />;
};

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <ul className={styles.link_list}>
            <li>
              <AppLink to={APP_ROUTES.root}>Home</AppLink>
            </li>
            <AppNavigation />
          </ul>
        </nav>
      </Container>
    </header>
  );
};

import { APP_ROUTES } from '../../../router/constants/app-routes';
import { not } from '../../../shared/utils/not';
import { Button } from '../../button/button';
import { AppLink } from '../../app-link/app-link';
import styles from './navigation.module.css';

export const SessionNavigation = () => {
  const isLogin = false;

  return (
    <>{isLogin && <div className={styles.private_links_container}></div>}</>
  );
};

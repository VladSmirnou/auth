import { Button } from '../button/button';
import type { LogoutButtonProps } from './types';
import styles from './logout-button.module.css';

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <Button className={styles.logout_button} onClick={onLogout}>
      logout
    </Button>
  );
};

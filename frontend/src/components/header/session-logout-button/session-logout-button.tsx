import { useLogoutMutation } from '../../../api/session-auth-api/session-auth-api';
import { LogoutButton } from '../../logout-button/logout-button';

export const SessionLogoutButton = () => {
  const [logoutTrigger] = useLogoutMutation();

  const handleLogout = () => {
    logoutTrigger();
  };

  return <LogoutButton onLogout={handleLogout} />;
};

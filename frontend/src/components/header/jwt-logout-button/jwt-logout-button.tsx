import { useLogoutMutation } from '../../../api/jwt-auth-api/jwt-auth-api';
import { LogoutButton } from '../../logout-button/logout-button';

export const JwtLogoutButton = () => {
  const [logoutTrigger] = useLogoutMutation();

  const handleLogout = () => {
    logoutTrigger();
  };

  return <LogoutButton onLogout={handleLogout} />;
};

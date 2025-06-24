import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../components/loader/loader';
import { useAppSelector } from '../hooks/typed-react-redux-hooks';
import { useIsLogin } from '../hooks/useIsLogin';
import { APP_ROUTES } from '../router/constants/app-routes';
import { selectForceLogoutPath } from '../model/jwt-auth-slice/jwt-auth-slice';

export const AuthPagesLayout = () => {
  const { isLoading, isLogin } = useIsLogin();
  const forceLogoutPath = useAppSelector(selectForceLogoutPath);

  if (isLoading) return <Loader />;

  return isLogin ? (
    <Navigate to={forceLogoutPath ?? APP_ROUTES.cards} replace />
  ) : (
    <Outlet />
  );
};

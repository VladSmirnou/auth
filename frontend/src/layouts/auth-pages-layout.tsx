import { Navigate, Outlet } from 'react-router-dom';
import { selectForceLogoutPath } from '../api/auth-slice';
import { Loader } from '../components/loader/loader';
import { useAppSelector } from '../hooks/hooks';
import { useIsLogin } from '../hooks/useIsLogin';
import { APP_ROUTES } from '../router/constants/app-routes';

export const AuthPagesLayout = () => {
  const { isLoading, isLogin } = useIsLogin();
  const forceLogoutPath = useAppSelector(selectForceLogoutPath);

  if (isLoading) return <Loader />;

  if (isLogin)
    return <Navigate to={forceLogoutPath ?? APP_ROUTES.cards} replace />;

  return <Outlet />;
};

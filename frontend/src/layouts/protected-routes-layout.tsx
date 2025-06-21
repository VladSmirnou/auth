import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from '../components/loader/loader';
import { useIsLogin } from '../hooks/useIsLogin';
import { APP_ROUTES } from '../router/constants/app-routes';

export const ProtectedRoutesLayout = () => {
  const { isLoading, isLogin } = useIsLogin();

  if (isLoading) return <Loader />;

  return isLogin ? <Outlet /> : <Navigate to={APP_ROUTES.login} replace />;
};

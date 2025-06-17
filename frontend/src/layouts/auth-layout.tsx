import { Navigate, Outlet } from "react-router-dom";
import { useIsLogin } from "../hooks/useIsLogin";
import { APP_ROUTES } from "../router/constants/app-routes";
import { Loader } from "../components/loader/loader";

export const AuthLayout = () => {
  const { isLoading, isLogin } = useIsLogin()

  if (isLoading) return <Loader />

  return isLogin ? <Outlet /> : <Navigate to={APP_ROUTES.login} replace />;
}

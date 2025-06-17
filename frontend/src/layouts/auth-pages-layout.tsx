import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { useIsLogin } from "../hooks/useIsLogin";
import { APP_ROUTES } from "../router/constants/app-routes";
import { Loader } from "../components/loader/loader";

export const AuthPagesLayout = () => {
    const { isLoading, isLogin } = useIsLogin()
    const forceLogoutUrl = useAppSelector(state => state.auth.forceLogoutPath);   

    if (isLoading) return <Loader />;
    if (isLogin) return <Navigate to={forceLogoutUrl ?? APP_ROUTES.cards} />;

    return <Outlet />;
}

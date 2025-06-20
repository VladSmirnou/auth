import { useIsLoginQuery } from '../api/auth-api/auth-api';
import { useAppSelector } from './hooks';

export const useIsLogin = () => {
  const { isLoading } = useIsLoginQuery();
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return { isLoading, isLogin };
};

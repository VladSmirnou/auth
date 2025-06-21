import { useIsLoginQuery } from '../api/auth-api/auth-api';
import { selectIsLogin } from '../api/auth-slice';
import { useAppSelector } from './hooks';

export const useIsLogin = () => {
  const { isLoading } = useIsLoginQuery();
  const isLogin = useAppSelector(selectIsLogin);

  return { isLoading, isLogin };
};

import { useIsLoginQuery } from '../api/jwt-auth-api/jwt-auth-api';
import { useAppSelector } from './typed-react-redux-hooks';
import { selectIsLogin } from '../model/jwt-auth-slice/jwt-auth-slice';

export const useIsLogin = () => {
  const { isLoading } = useIsLoginQuery();
  const isLogin = useAppSelector(selectIsLogin);

  return { isLoading, isLogin };
};

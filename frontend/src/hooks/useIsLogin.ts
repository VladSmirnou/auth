import { useIsLoginQuery } from '../api/jwt-auth-api/jwt-auth-api';
import { selectIsLogin } from '../model/app-slice/app-slice';
import { useAppSelector } from './typed-react-redux-hooks';

export const useIsLogin = () => {
  const { isLoading } = useIsLoginQuery();
  const isLogin = useAppSelector(selectIsLogin);

  return { isLoading, isLogin };
};

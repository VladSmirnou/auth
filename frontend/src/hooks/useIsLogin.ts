import { useIsLoginQuery } from '../api/auth-api/auth-api';
import { useAppSelector } from './typed-react-redux-hooks';
import { selectIsLogin } from '../model/auth-slice/auth-slice';

export const useIsLogin = () => {
  const { isLoading } = useIsLoginQuery();
  const isLogin = useAppSelector(selectIsLogin);

  return { isLoading, isLogin };
};

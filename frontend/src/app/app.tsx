import '../index.css';
import { RouterProvider } from 'react-router';
import { useAppSelector } from '../hooks/typed-react-redux-hooks';
import { selectCurrentAuthMode } from '../model/app-slice/app-slice';
import { getRouter } from '../router/router';

export const App = () => {
  const authType = useAppSelector(selectCurrentAuthMode);

  const router = getRouter(authType);

  return <RouterProvider router={router} />;
};

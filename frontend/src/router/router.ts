import { createBrowserRouter } from 'react-router-dom';
import { AuthPagesLayout } from '../layouts/auth-pages-layout';
import { MainLayout } from '../layouts/main/main';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Home } from '../pages/home/home';
import { Cards } from '../pages/cards/Cards';
import { UserCreated } from '../pages/user-created/user-created';
import { APP_ROUTES } from './constants/app-routes';
import { ProtectedRoutesLayout } from '../layouts/protected-routes-layout';
import { RandomPage } from '../pages/random-page/random-page';

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        Component: AuthPagesLayout,
        children: [
          {
            path: APP_ROUTES.login,
            Component: Login,
          },
          {
            path: APP_ROUTES.signup,
            Component: Signup,
          },
          {
            path: APP_ROUTES.userCreated,
            Component: UserCreated,
          },
        ],
      },
      {
        Component: ProtectedRoutesLayout,
        children: [
          {
            path: APP_ROUTES.cards,
            Component: Cards,
          },
          {
            path: APP_ROUTES.randomPage,
            Component: RandomPage,
          },
        ],
      },
      {
        path: APP_ROUTES.root,
        Component: Home,
      },
    ],
  },
]);

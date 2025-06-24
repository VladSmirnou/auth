import { createBrowserRouter, type RouteObject } from 'react-router-dom';
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
import type { AppAuthModes, AuthModes } from '../model/app-slice/types';
import { SessionSignup } from '../pages/session-signup/session-signup';
import { SessionLogin } from '../pages/session-login/session-login';

const userCreatedRoute: RouteObject = {
  path: APP_ROUTES.userCreated,
  Component: UserCreated,
};

const homeRoute: RouteObject = {
  index: true,
  Component: Home,
};

const selectRouter = (authMode: AuthModes) => {
  if (authMode === 'JWT') {
    return [
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
          userCreatedRoute,
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
    ];
  } else {
    return [
      {
        path: APP_ROUTES.signup,
        Component: SessionSignup,
      },
      {
        path: APP_ROUTES.login,
        Component: SessionLogin,
      },
      userCreatedRoute,
    ];
  }
};

export const getRouter = (authMode: AppAuthModes) => {
  let children: Array<RouteObject> = [
    homeRoute,
    ...(authMode ? selectRouter(authMode) : []),
  ];

  return createBrowserRouter([
    {
      path: APP_ROUTES.root,
      Component: MainLayout,
      children,
    },
  ]);
};

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

const selectRouter = (authMode: AuthModes) => {
  const userCreatedPageRoute = getUserCreatedPageRoute(authMode);

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
          userCreatedPageRoute,
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
        path: APP_ROUTES.sessionSignup,
        Component: SessionSignup,
      },
      {
        path: APP_ROUTES.sessionSignup,
        Component: SessionSignup,
      },
      {
        path: APP_ROUTES.sessionLogin,
        Component: SessionLogin,
      },
      userCreatedPageRoute,
    ];
  }
};

const loginPageRedirectUrlMap: Record<AuthModes, string> = {
  JWT: APP_ROUTES.login,
  session: APP_ROUTES.sessionLogin,
};

const getUserCreatedPageRoute = (authMode: AuthModes): RouteObject => {
  const loginPageRedirectUrl = loginPageRedirectUrlMap[authMode];

  return {
    path: APP_ROUTES.userCreated,
    element: <UserCreated loginPageRedirectUrl={loginPageRedirectUrl} />,
  };
};

export const getRouter = (authMode: AppAuthModes) => {
  let children: Array<RouteObject> = [
    {
      index: true,
      Component: Home,
    },
  ];
  if (authMode) {
    children.push(...selectRouter(authMode));
  }

  return createBrowserRouter([
    {
      path: APP_ROUTES.root,
      Component: MainLayout,
      children,
    },
  ]);
};

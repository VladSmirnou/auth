import { createAction } from '@reduxjs/toolkit';
import type { NewAccessTokeReponse, RefreshTokenExpired } from './types';

export const refreshTokenExpired = createAction<RefreshTokenExpired>(
  'refreshTokenExpired'
);

export const newAccessTokenReceived = createAction<NewAccessTokeReponse>(
  'newAccessTokenReceived'
);

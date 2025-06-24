import type { MaybeUndefined } from '../../shared/types';

export const authModesArray = ['JWT', 'session'] as const;
export type AuthModes = (typeof authModesArray)[number];
export type AppAuthModes = MaybeUndefined<AuthModes>;

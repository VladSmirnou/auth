import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jwtBaseApi } from '../api/jwt-auth-api/jwt-base-api';
import { appSliceName, appSliceReducer } from '../model/app-slice/app-slice';
import {
  jwtAuthSliceName,
  jwtAuthSliceReducer,
} from '../model/jwt-auth-slice/jwt-auth-slice';
import { sessionBaseApi } from '../api/session-auth-api/session-base-api';

export const store = configureStore({
  reducer: {
    [jwtBaseApi.reducerPath]: jwtBaseApi.reducer,
    [jwtAuthSliceName]: jwtAuthSliceReducer,
    [sessionBaseApi.reducerPath]: sessionBaseApi.reducer,
    [appSliceName]: appSliceReducer,
  },
  middleware: (gDM) => {
    return gDM().concat([jwtBaseApi.middleware, sessionBaseApi.middleware]);
  },
});

setupListeners(store.dispatch);

//@ts-ignore
window.store = store;

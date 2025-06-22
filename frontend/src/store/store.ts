import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../api/base-api/base-api';
import { appSliceName, appSliceReducer } from '../model/app-slice/app-slice';
import {
  authSliceName,
  authSliceReducer,
} from '../model/auth-slice/auth-slice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSliceName]: authSliceReducer,
    [appSliceName]: appSliceReducer,
  },
  middleware: (gDM) => {
    return gDM().concat(baseApi.middleware);
  },
});

setupListeners(store.dispatch);

//@ts-ignore
window.store = store;

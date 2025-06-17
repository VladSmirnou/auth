import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSliceName, authSliceReducer } from '../api/auth-slice';
import { baseApi } from '../api/base-api';

export const store = configureStore({
  reducer: { 
    [baseApi.reducerPath]: baseApi.reducer,
    [authSliceName]: authSliceReducer
  },
  middleware: gDM => {
    return gDM().concat(baseApi.middleware)
  }
})

setupListeners(store.dispatch);

//@ts-ignore
window.store = store
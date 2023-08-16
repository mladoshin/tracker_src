import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/slice';
import { appApi } from '../api/api_index';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorHandler } from './errorHandler';

export const store = configureStore({
  reducer: {
    auth,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware, rtkQueryErrorHandler),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

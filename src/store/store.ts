import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { localStorageMiddleware } from './local-storage-middleware';

const persistedBasket = localStorage.getItem('basket');
const preloadedState = persistedBasket
  ? { basket: JSON.parse(persistedBasket) }
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

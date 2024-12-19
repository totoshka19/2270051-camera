import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { localStorageMiddleware } from './local-storage-middleware';
import { BasketState } from '../types/state';

const persistedBasket = localStorage.getItem('basket');
const preloadedState = persistedBasket
  ? { basket: JSON.parse(persistedBasket) as BasketState }
  : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;

import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './root-reducer';

export const localStorageMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  const result: unknown = next(action);
  const state = store.getState();

  if (state.basket && Array.isArray(state.basket.items)) {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }

  return result;
};

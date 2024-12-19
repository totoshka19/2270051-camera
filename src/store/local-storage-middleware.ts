import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './root-reducer';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state: RootState = store.getState();

  if (state.basket) {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }

  return result;
};

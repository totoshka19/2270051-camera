import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state: RootState = store.getState();

  if (state.basket && typeof state.basket === 'object') {
    localStorage.setItem('basket', JSON.stringify(state.basket));
  }

  return result;
};

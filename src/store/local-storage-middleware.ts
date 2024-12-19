import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './root-reducer';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState() as RootState;

  if (state.basket && typeof state.basket === 'object' && 'items' in state.basket) {
    if (Array.isArray(state.basket.items)) {
      localStorage.setItem('basket', JSON.stringify(state.basket));
    }
  }

  return result;
};

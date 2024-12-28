import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { BasketState } from '../types/state';
import { RootState } from './root-reducer';

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const basketItem = state.items.find((item) => item.product.id === action.payload.id);
      if (basketItem) {
        basketItem.quantity = action.payload.quantity;
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } = basketSlice.actions;

export const selectIsProductInBasket = (state: RootState, productId: number) =>
  state.basket.items.some((item) => item.product.id === productId);

export default basketSlice.reducer;

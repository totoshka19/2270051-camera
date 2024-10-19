import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiRoute, RequestStatus, URL_API } from '../conts';
import { Product } from '../types/product';
import { ProductsState } from '../types/state';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(`${URL_API}${ApiRoute.Cameras}`);
    return response.data;
  }
);

const initialState: ProductsState = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default productsSlice.reducer;

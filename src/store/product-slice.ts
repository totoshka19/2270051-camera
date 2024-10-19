import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/product';
import { ApiRoute, RequestStatus, URL_API } from '../conts';
import { ProductState } from '../types/state';

export const fetchProduct = createAsyncThunk<Product, number>(
  'product/fetchProduct',
  async (cameraId: number) => {
    const response = await axios.get<Product>(`${URL_API}${ApiRoute.Cameras}/${cameraId}`);
    return response.data;
  }
);

const initialState: ProductState = {
  item: null,
  status: RequestStatus.Idle,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.item = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default productSlice.reducer;

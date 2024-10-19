import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/product';
import { ApiRoute, RequestStatus, URL_API } from '../conts';
import { ProductsState } from '../types/state';

export const fetchSimilarProducts = createAsyncThunk<Product[], number>(
  'products/fetchSimilarProducts',
  async (cameraId: number) => {
    const response = await axios.get<Product[]>(`${URL_API}${ApiRoute.Cameras}/${cameraId}/similar`);
    return response.data;
  }
);

const initialState: ProductsState = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
};

const productSimilarSlice = createSlice({
  name: 'similarProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default productSimilarSlice.reducer;

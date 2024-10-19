import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiRoute, URL_API, RequestStatus, ORDER_ERROR_MESSAGE } from '../conts';
import { Order } from '../types/order';
import { OrderState } from '../types/state';

export const createOrder = createAsyncThunk<Order, Order>(
  'order/createOrder',
  async (orderData) => {
    try {
      const response = await axios.post<Order>(`${URL_API}${ApiRoute.Orders}`, orderData);
      return response.data;
    } catch (error) {
      throw new Error(ORDER_ERROR_MESSAGE);
    }
  }
);

const initialState: OrderState = {
  status: RequestStatus.Idle,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = RequestStatus.Succeeded;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default orderSlice.reducer;

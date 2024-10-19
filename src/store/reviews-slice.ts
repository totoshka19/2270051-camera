import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Review } from '../types/review';
import {ApiRoute, RequestStatus, URL_API} from '../conts';
import {ReviewsState} from '../types/state';

export const fetchReviews = createAsyncThunk<Review[], number>(
  'reviews/fetchReviews',
  async (cameraId: number) => {
    const response = await axios.get<Review[]>(`${URL_API}${ApiRoute.Cameras}/${cameraId}/reviews`);
    return response.data;
  }
);

const initialState: ReviewsState = {
  reviews: [],
  status: RequestStatus.Idle,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default reviewsSlice.reducer;

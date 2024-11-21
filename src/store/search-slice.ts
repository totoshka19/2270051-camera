import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { SearchState } from '../types/state';
import { RequestStatus } from '../conts';

const initialState: SearchState = {
  results: [],
  status: RequestStatus.Idle,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.results = action.payload;
      state.status = RequestStatus.Succeeded;
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.status = RequestStatus.Idle;
    },
  },
});

export const { setSearchResults, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;

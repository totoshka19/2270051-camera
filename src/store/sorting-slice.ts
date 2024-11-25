import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortDirection, SortType } from '../conts';
import {SortParams} from '../types/sorting';

const initialState: SortParams = {
  type: SortType.Price,
  direction: SortDirection.Asc,
};

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<string>) => {
      state.direction = action.payload;
    },
  },
});

export const { setSortType, setSortDirection } = sortingSlice.actions;
export default sortingSlice.reducer;

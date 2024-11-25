import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterParams } from '../types/filter';

const initialState: FilterParams = {
  price: { min: '', max: '' },
  category: '',
  cameraType: {
    Collectible: false,
    Instant: false,
    Digital: false,
    Film: false,
  },
  level: {
    Zero: false,
    Amateur: false,
    Professional: false,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<Partial<FilterParams>>) => ({ ...state, ...action.payload }),
    resetFilters: () => initialState,
  },
});

export const { updateFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;

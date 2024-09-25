import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products-slice';
import productReducer from './product-slice';
import reviewsReducer from './reviews-slice';

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  reviews: reviewsReducer,
});

export default rootReducer;

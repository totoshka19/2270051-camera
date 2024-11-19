import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products-slice';
import productReducer from './product-slice';
import reviewsReducer from './reviews-slice';
import orderReducer from './order-slice';
import productSimilarReducer from './product-similar-slice';
import searchReducer from './search-slice';

const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  reviews: reviewsReducer,
  order: orderReducer,
  productSimilar: productSimilarReducer,
  search: searchReducer,
});

export default rootReducer;

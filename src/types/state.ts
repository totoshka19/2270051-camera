import { Product } from './product';
import {Review} from './review';
import { ProductCategory, ProductLevel, ProductType, RequestStatus } from '../conts';

export type ProductState = {
  item: Product | null;
  status: typeof RequestStatus[keyof typeof RequestStatus];
  error: string | null;
}

export type ProductsState = {
  items: Product[];
  status: typeof RequestStatus[keyof typeof RequestStatus];
  error: string | null;
}

export type ReviewsState = {
  reviews: Review[];
  status: typeof RequestStatus[keyof typeof RequestStatus];
  error: string | null;
}

export type OrderState = {
  status: typeof RequestStatus[keyof typeof RequestStatus];
  error: string | null;
}

export type SearchState = {
  results: Product[];
  status: typeof RequestStatus[keyof typeof RequestStatus];
  error: string | null;
}

export type FilterState = {
  price: {
    min: number | '';
    max: number | '';
  };
  category: keyof typeof ProductCategory | '';
  cameraType: {
    [key in keyof typeof ProductType]: boolean;
  };
  level: {
    [key in keyof typeof ProductLevel]: boolean;
  };
}

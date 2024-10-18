import { RequestStatus } from '../conts';
import { Product } from './product';
import {Review} from './review';

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

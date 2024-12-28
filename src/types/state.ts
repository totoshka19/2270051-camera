import { Product } from './product';
import { Review } from './review';
import { BasketItem } from './basket';
import { RequestStatus } from '../conts';

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
  postStatus: typeof RequestStatus[keyof typeof RequestStatus];
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

export type BasketState = {
  items: BasketItem[];
};

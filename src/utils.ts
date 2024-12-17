import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Review} from './types/review';
import {Product} from './types/product';
import {SortParams} from './types/sorting';
import {FilterParams} from './types/filter';
import {SortDirection, SortType} from './conts';

export function formatDate(dateString: string): string {
  return dayjs(dateString).locale('ru').format('DD MMMM');
}

export function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function getNextIndex(currentIndex: number, totalItems: number, slidesPerView: number): number {
  return Math.min(currentIndex + slidesPerView, totalItems - slidesPerView);
}

export function getPrevIndex(currentIndex: number, slidesPerView: number): number {
  return Math.max(currentIndex - slidesPerView, 0);
}

export function sortReviewsByDate(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
}

export function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function searchProducts (products: Product[], searchTerm: string): Product[] {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

export function sortProducts(products: Product[], sortParams: SortParams): Product[] {
  return [...products].sort((a, b) => {
    if (sortParams.type === SortType.Price) {
      return sortParams.direction === SortDirection.Asc ? a.price - b.price : b.price - a.price;
    } else if (sortParams.type === SortType.Popular) {
      return sortParams.direction === SortDirection.Asc ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });
}

export function filterProducts(products: Product[], filters: FilterParams): Product[] {
  return products.filter((product) => {
    const { price, category, cameraType, level } = filters;

    if (price.min !== '' && product.price < Number(price.min)) {
      return false;
    }
    if (price.max !== '' && product.price > Number(price.max)) {
      return false;
    }

    if (category && product.category !== category) {
      return false;
    }

    if (Object.keys(cameraType).some((type) => cameraType[type as keyof typeof cameraType] && product.type !== type)) {
      return false;
    }

    return !Object.keys(level).some((lvl) => level[lvl as keyof typeof level] && product.level !== lvl);
  });
}

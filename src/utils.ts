import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {Review} from './types/review';

export function formatDate(dateString: string): string {
  return dayjs(dateString).locale('ru').format('DD MMMM');
}

export function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function validatePhoneNumber(phone: string) {
  const phoneRegex = /^\+?[78][\s(]?9\d{2}[\s)-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  return phoneRegex.test(phone);
}

export function formatPhoneNumber(phone: string) {
  let cleaned = (`${ phone}`).replace(/\D/g, '');

  if (cleaned.startsWith('8')) {
    cleaned = `+7${ cleaned.slice(1)}`;
  } else if (cleaned.startsWith('7')) {
    cleaned = `+${ cleaned}`;
  }
  return cleaned;
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

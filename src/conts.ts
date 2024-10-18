export const URL_API = 'https://camera-shop.accelerator.htmlacademy.pro';

export const ApiRoute = {
  Cameras: '/cameras',
  Orders: '/orders',
} as const;

export const AppRoute = {
  Catalog: '/',
  Camera: '/camera/:id',
  Basket: '/basket',
} as const;

export const RequestStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Succeeded: 'succeeded',
  Failed: 'failed',
} as const;

export const ProductType = {
  Collectible: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

export const ProductCategory = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

export const ProductLevel = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const NUMBER_OF_REVIEWS = 3;

export const ORDER_ERROR_MESSAGE = 'Ошибка при отправке заявки';

export const PHONE_FORMAT_ERROR_MESSAGE = 'Введите номер в формате +7(9XX)XXX-XX-XX';

export const URL_API = 'https://camera-shop.accelerator.htmlacademy.pro';

export const ApiRoute = {
  Cameras: '/cameras',
} as const;

export const AppRoute = {
  Catalog: '/',
  Product: '/product/:id',
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

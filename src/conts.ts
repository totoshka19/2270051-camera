export const URL_API = 'https://camera-shop.accelerator.htmlacademy.pro';

export const ApiRoute = {
  Cameras: '/cameras',
  Orders: '/orders',
} as const;

export const AppRoute = {
  Catalog: '/',
  Camera: '/camera/:id',
  Card: '/card',
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

export const BREADCRUMBS_CATALOG = [
  { label: 'Главная', link: AppRoute.Catalog },
  { label: 'Каталог' },
];

export const BREADCRUMBS_PRODUCT = (productName: string) => [
  { label: 'Главная', link: AppRoute.Catalog },
  { label: 'Каталог', link: AppRoute.Catalog },
  { label: productName },
];

export const BREADCRUMBS_BASKET = [
  { label: 'Главная', link: AppRoute.Catalog },
  { label: 'Каталог', link: AppRoute.Catalog },
  { label: 'Корзина' },
];

export const NUMBER_OF_REVIEWS = 3;

export const SLIDES_PER_VIEW = 3;

export const MAX_RATING_STARS = 5;

export const MIN_SEARCH_LENGTH = 3;

export const LOADING_MESSAGE = 'Идет загрузка...';

export const ERROR_MESSAGE = 'Возникла ошибка, попробуйте позже';

export const ORDER_ERROR_MESSAGE = 'Ошибка при отправке заявки';

export const Slides = [
  {
    Id: 1,
    Image: './img/content/promo-look-54',
    Title: 'Cannonball Pro MX 8i',
    Description: 'Профессиональная камера от известного производителя',
    Link: '/camera/3',
  },
  {
    Id: 2,
    Image: './img/content/promo_click-lite-r',
    Title: 'Ретрокамера Das Auge IV',
    Description: 'Для истинных ценителей и коллекционеров',
    Link: '/camera/1',
  },
  {
    Id: 3,
    Image: './img/content/promo_click_pro',
    Title: 'FastShot MR-5',
    Description: 'Маленькое чудо фотографии',
    Link: '/camera/2',
  },
];

export const SortType = {
  Price: 'sortPrice',
  Popular: 'sortPopular',
} as const;

export const SortDirection = {
  Asc: 'up',
  Desc: 'down',
} as const;

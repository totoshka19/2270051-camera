import { ProductCategory, ProductLevel, ProductType } from '../conts';

export type FilterParams = {
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

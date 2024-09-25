import { ProductCategory, ProductLevel, ProductType } from '../conts';

export type BaseProduct = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  price: number;
  rating: number;
  reviewCount: number;
};

export type Product = BaseProduct & {
  vendorCode: string;
  type: typeof ProductType[keyof typeof ProductType];
  category: typeof ProductCategory[keyof typeof ProductCategory];
  description: string;
  level: typeof ProductLevel[keyof typeof ProductLevel];
};

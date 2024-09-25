import React from 'react';
import { BaseProduct } from '../../types/product';
import { formatPrice } from '../../utils';

type ProductCardProps = {
  product: BaseProduct;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`} />
          <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="280" height="240" alt={product.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg key={`${product.id}-star-${index < product.rating ? 'full' : 'empty'}`} width="17" height="16" aria-hidden="true">
              <use xlinkHref={`#icon-${index < product.rating ? 'full-star' : 'star'}`}></use>
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(product.price)}</p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <a className="btn btn--transparent" href="#">Подробнее</a>
      </div>
    </div>
  );
}

export default ProductCard;

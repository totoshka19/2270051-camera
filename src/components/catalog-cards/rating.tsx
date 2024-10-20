import { Product } from '../../types/product';

type RatingProps = {
  product: Product;
};

function Rating({ product }: RatingProps) {
  return (
    <div className="rate product-card__rate">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={`${product.id}-star-${index}`} width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${index < product.rating ? 'full-star' : 'star'}`}></use>
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {product.rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
    </div>
  );
}

export default Rating;

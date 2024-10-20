import { Product } from '../../types/product';
import StarRating from './star-rating';

type RatingProps = {
  product: Product;
};

function Rating({ product }: RatingProps) {
  return (
    <div className="rate product-card__rate">
      <StarRating rating={product.rating} id={product.id} />
      <p className="visually-hidden">Рейтинг: {product.rating}</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
    </div>
  );
}

export default Rating;

import { useState } from 'react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils';
import { Link } from 'react-router-dom';
import PopUpContactMe from '../pop-up-contact-me/pop-up-contact-me';

type ProductCardProps = {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
            <svg key={index} width="17" height="16" aria-hidden="true">
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
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyClick}>Купить</button>
        <Link to={`/camera/${product.id}`} className="btn btn--transparent">Подробнее</Link>
      </div>
      {isPopupOpen && <PopUpContactMe product={product} onClose={handleClosePopup} />}
    </div>
  );
}

export default ProductCard;

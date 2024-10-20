import { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUpContactMe from '../pop-up-contact-me/pop-up-contact-me';
import { Product } from '../../types/product';
import Rating from './rating';
import { formatPrice } from '../../utils';

type ProductCardProps = {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBuyClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`product-card ${className || ''}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`} />
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="280" height="240" alt={product.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating product={product} />
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

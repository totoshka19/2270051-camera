import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PopUpAddToCart from '../pop-up/pop-up-add-to-cart';
import PopUpAddToCartSuccess from '../pop-up/pop-up-add-to-cart-success';
import { Product } from '../../types/product';
import Rating from '../rating/rating';
import { formatPrice } from '../../utils';
import { AppRoute } from '../../conts';
import { RootState } from '../../store/store';
import { selectIsProductInBasket } from '../../store/basket-slice';

type ProductCardProps = {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const isInCart = useSelector((state: RootState) => selectIsProductInBasket(state, product.id));

  const handleBuyClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenSuccessPopup = () => {
    setIsSuccessPopupOpen(true);
  };

  const handleCloseSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
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
        {isInCart ? (
          <Link
            to={AppRoute.Basket}
            className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
          >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link>
        ) : (
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleBuyClick}
          >
            Купить
          </button>
        )}
        <Link to={`/camera/${product.id}`} className="btn btn--transparent">Подробнее</Link>
      </div>
      {isPopupOpen && (
        <PopUpAddToCart
          product={product}
          onClose={handleClosePopup}
          onSuccess={handleOpenSuccessPopup}
        />
      )}
      {isSuccessPopupOpen && (
        <PopUpAddToCartSuccess onClose={handleCloseSuccessPopup} />
      )}
    </div>
  );
}

export default ProductCard;

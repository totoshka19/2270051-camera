import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { usePopUp } from '../../hooks/use-pop-up';
import ProductInfoShort from './product-info-short';
import { addToBasket } from '../../store/basket-slice';
import { AppDispatch } from '../../store/store';
import { Product } from '../../types/product';

type PopUpProps = {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

function PopUpAddToCart({ product, onClose, onSuccess }: PopUpProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { handleOverlayClick } = usePopUp({ onClose, modalRef });

  const handleSubmitForm = () => {
    dispatch(addToBasket(product));
    onClose();
    onSuccess();
  };

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <ProductInfoShort product={product} />
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleSubmitForm}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpAddToCart;

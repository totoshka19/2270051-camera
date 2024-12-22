import { usePopUp } from '../../hooks/use-pop-up';
import ProductInfoShort from './product-info-short';
import { Product } from '../../types/product';
import { useRef } from 'react';

type PopUpRemoveItemProps = {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
};

function PopUpRemoveItem({ product, onClose, onConfirm }: PopUpRemoveItemProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { handleOverlayClick } = usePopUp({ onClose, modalRef });

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <ProductInfoShort product={product} />
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={onConfirm}
            >
              Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              type="button"
              onClick={onClose}
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use href="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpRemoveItem;

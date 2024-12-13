import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePopUp } from '../../hooks/use-pop-up';
import { AppRoute } from '../../conts';

type PopUpAddToCartSuccessProps = {
  onClose: () => void;
};

function PopUpAddToCartSuccess({ onClose }: PopUpAddToCartSuccessProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
  });

  const handleContinueShoppingClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="modal is-active modal--narrow" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a
              className="btn btn--transparent modal__btn"
              href="#"
              onClick={handleContinueShoppingClick}
            >
              Продолжить покупки
            </a>
            <Link
              to={AppRoute.Basket}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={onClose}
            >
              Перейти в корзину
            </Link>
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

export default PopUpAddToCartSuccess;

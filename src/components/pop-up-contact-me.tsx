import React, { useRef, useState } from 'react';
import { Product } from '../types/product';
import { formatPrice } from '../utils';
import { usePopUp } from '../hooks/use-pop-up';

type PopUpProps = {
  product: Product;
  onClose: () => void;
}

function PopUpContactMe({ product, onClose }: PopUpProps) {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { handleOverlayClick } = usePopUp({ onClose, initialFocusRef: phoneInputRef, modalRef });

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    setPhone(value);
    setIsPhoneValid(value.length === 11);
  };

  const handleSubmit = () => {
    if (isPhoneValid) {
      onClose();
    }
  };

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`} />
                <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="140" height="120" alt={product.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{product.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
                  <span className="basket-item__number">{product.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{product.category}</li>
                <li className="basket-item__list-item">{product.level}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(product.price)}</p>
            </div>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">
                Телефон
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input
                type="tel"
                name="user-tel"
                placeholder="Введите ваш номер"
                value={phone}
                onChange={handlePhoneChange}
                ref={phoneInputRef}
                required
              />
            </label>
            {!isPhoneValid && <p className="custom-input__error">Нужно указать номер в формате +79XXXXXXXXX</p>}
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleSubmit} disabled={!isPhoneValid}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Заказать
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

export default PopUpContactMe;

import React, {useEffect, useRef, useState} from 'react';
import { Product } from '../../types/product';
import { formatPhoneNumber, validatePhoneNumber } from '../../utils';
import { usePopUp } from '../../hooks/use-pop-up';
import ProductInfoShort from './product-info-short';

type PopUpProps = {
  product: Product;
  onClose: () => void;
}

function PopUpContactMe({ product, onClose }: PopUpProps) {
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);

  const { handleOverlayClick } = usePopUp({ onClose, initialFocusRef: phoneInputRef, modalRef });

  const handlePhoneChange = () => {
    const phone = phoneInputRef.current?.value || '';
    const isValid = validatePhoneNumber(phone);
    setIsPhoneValid(isValid);
    if (!isValid) {
      setPhoneError('Укажите номер в формате +7(9XX)XXX-XX-XX');
    } else {
      setPhoneError(null);
    }
  };

  const handleSubmit = () => {
    const phone = phoneInputRef.current?.value || '';
    if (!validatePhoneNumber(phone)) {
      setPhoneError('Укажите номер в формате +7(9XX)XXX-XX-XX');
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);
    console.log('Отправляем на сервер:', formattedPhone);
    // Здесь можно добавить логику отправки данных на сервер
    onClose();
  };

  useEffect(() => {
    const phoneInput = phoneInputRef.current;
    if (phoneInput) {
      phoneInput.addEventListener('input', handlePhoneChange);
    }

    return () => {
      if (phoneInput) {
        phoneInput.removeEventListener('input', handlePhoneChange);
      }
    };
  }, []);

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <ProductInfoShort product={product} />
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
                ref={phoneInputRef}
                required
              />
              {phoneError && <div className="error-message">{phoneError}</div>}
            </label>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleSubmit}
              disabled={!isPhoneValid}
            >
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

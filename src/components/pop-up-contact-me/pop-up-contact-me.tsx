import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/product';
import { formatPhoneNumber, validatePhoneNumber } from '../../utils';
import { usePopUp } from '../../hooks/use-pop-up';
import ProductInfoShort from './product-info-short';
import { createOrder } from '../../store/order-slice';
import { ORDER_ERROR_MESSAGE, PHONE_FORMAT_ERROR_MESSAGE } from '../../conts';
import { AppDispatch } from '../../store/store';

type PopUpProps = {
  product: Product;
  onClose: () => void;
}

function PopUpContactMe({ product, onClose }: PopUpProps) {
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { handleOverlayClick } = usePopUp({ onClose, initialFocusRef: phoneInputRef, modalRef });

  const handleSubmitForm = () => {
    const phone = phoneInputRef.current?.value || '';
    if (!validatePhoneNumber(phone)) {
      setPhoneError(PHONE_FORMAT_ERROR_MESSAGE);
      return;
    }

    const formattedPhone = formatPhoneNumber(phone);
    try {
      dispatch(createOrder({
        camerasIds: [product.id],
        coupon: null,
        tel: formattedPhone,
      }));

      onClose();
    } catch (error) {
      setPhoneError(ORDER_ERROR_MESSAGE);
    }
  };

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
              onClick={handleSubmitForm}
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

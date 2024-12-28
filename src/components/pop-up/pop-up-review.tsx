import React, { useRef } from 'react';
import { usePopUp } from '../../hooks/use-pop-up';
import StarRating from '../rating/star-rating';

type PopUpReviewProps = {
  onClose: () => void;
};

function PopUpReview({ onClose }: PopUpReviewProps) {
  const rating = 0;
  const id = 'popup-review';

  const modalRef = useRef<HTMLDivElement | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
  });

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper" onClick={handleOverlayClick}>
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post">
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <StarRating rating={rating} id={id} />
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-name" placeholder="Введите ваше имя" required />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-plus" placeholder="Основные преимущества товара" required />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-minus" placeholder="Главные недостатки товара" required />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea name="user-comment" minLength="5" placeholder="Поделитесь своим опытом покупки"></textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUpReview;

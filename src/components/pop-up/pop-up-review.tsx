import React, { useRef, useState } from 'react';
import { usePopUp } from '../../hooks/use-pop-up';
import { getRange, getStarTitle, validateReviewForm } from '../../utils';
import {
  ERROR_BUTTON_TEXT,
  MAX_RATING_STARS,
  REVIEW_ERROR_MESSAGE,
  REVIEW_SUCCESS_TITLE,
  SUCCESS_BUTTON_TEXT
} from '../../conts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { postReview } from '../../store/reviews-slice';

type PopUpReviewProps = {
  onClose: () => void;
  cameraId: number;
  onShowPopUpCart: (title: string, buttonText: string, iconType: 'success' | 'error') => void;
};

function PopUpReview({ onClose, cameraId, onShowPopUpCart }: PopUpReviewProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');

  const [ratingError, setRatingError] = useState('');
  const [nameError, setNameError] = useState('');
  const [advantagesError, setAdvantagesError] = useState('');
  const [disadvantagesError, setDisadvantagesError] = useState('');
  const [commentError, setCommentError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
  });

  const handleStarClick = (value: number) => {
    setRating(value);
    setRatingError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateReviewForm({
      rating,
      name,
      advantages,
      disadvantages,
      comment,
    });

    setRatingError(errors.ratingError);
    setNameError(errors.nameError);
    setAdvantagesError(errors.advantagesError);
    setDisadvantagesError(errors.disadvantagesError);
    setCommentError(errors.commentError);

    const isValid = !Object.values(errors).some((error) => error !== '');

    if (isValid) {
      setIsSubmitting(true);

      try {
        await dispatch(
          postReview({
            cameraId,
            userName: name,
            advantage: advantages,
            disadvantage: disadvantages,
            review: comment,
            rating,
          })
        ).unwrap();

        onShowPopUpCart(REVIEW_SUCCESS_TITLE, SUCCESS_BUTTON_TEXT, 'success');
        onClose();
      } catch (error) {
        onShowPopUpCart(REVIEW_ERROR_MESSAGE, ERROR_BUTTON_TEXT, 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const stars = getRange(1, MAX_RATING_STARS).reverse();

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit} noValidate>
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {stars.map((value) => (
                        <React.Fragment key={value}>
                          <input
                            className="visually-hidden"
                            id={`star-${value}`}
                            name="rate"
                            type="radio"
                            value={value}
                            onChange={() => handleStarClick(value)}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${value}`}
                            title={getStarTitle(value)}
                          >
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{rating}</span> <span>/</span> <span className="rate__all-stars">{MAX_RATING_STARS}</span>
                    </div>
                  </div>
                  <p className="rate__message" style={{ opacity: ratingError ? 1 : 0 }}>
                    {ratingError}
                  </p>
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <p className="custom-input__error" style={{ opacity: nameError ? 1 : 0 }}>
                    {nameError}
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      value={advantages}
                      onChange={(e) => setAdvantages(e.target.value)}
                      required
                    />
                  </label>
                  <p className="custom-input__error" style={{ opacity: advantagesError ? 1 : 0 }}>
                    {advantagesError}
                  </p>
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      value={disadvantages}
                      onChange={(e) => setDisadvantages(e.target.value)}
                      required
                    />
                  </label>
                  <p className="custom-input__error" style={{ opacity: disadvantagesError ? 1 : 0 }}>
                    {disadvantagesError}
                  </p>
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      minLength={10}
                      placeholder="Поделитесь своим опытом покупки"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error" style={{ opacity: commentError ? 1 : 0 }}>
                    {commentError}
                  </div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" disabled={isSubmitting}>
                Отправить отзыв
              </button>
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

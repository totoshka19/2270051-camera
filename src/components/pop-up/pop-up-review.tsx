import React, { useRef, useState } from 'react';
import { usePopUp } from '../../hooks/use-pop-up';
import { getRange, getStarTitle } from '../../utils';
import { MAX_RATING_STARS } from '../../conts';

type PopUpReviewProps = {
  onClose: () => void;
};

function PopUpReview({ onClose }: PopUpReviewProps) {
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

  const modalRef = useRef<HTMLDivElement | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
  });

  const handleStarClick = (value: number) => {
    setRating(value);
    setRatingError('');
  };

  const validateForm = () => {
    let isValid = true;

    if (rating < 1 || rating > MAX_RATING_STARS || !Number.isInteger(rating)) {
      setRatingError('Нужно оценить товар');
      isValid = false;
    } else {
      setRatingError('');
    }

    if (name.trim().length < 2 || name.trim().length > 15) {
      setNameError('Нужно указать имя');
      isValid = false;
    } else {
      setNameError('');
    }

    if (advantages.trim().length < 10 || advantages.trim().length > 160) {
      setAdvantagesError('Нужно указать достоинства');
      isValid = false;
    } else {
      setAdvantagesError('');
    }

    if (disadvantages.trim().length < 10 || disadvantages.trim().length > 160) {
      setDisadvantagesError('Нужно указать недостатки');
      isValid = false;
    } else {
      setDisadvantagesError('');
    }

    if (comment.trim().length < 10 || comment.trim().length > 160) {
      setCommentError('Нужно добавить комментарий');
      isValid = false;
    } else {
      setCommentError('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Форма отзыва заполнена правильно');
    } else {
      console.log('Форма содержит ошибки');
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
              <button className="btn btn--purple form-review__btn" type="submit">
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

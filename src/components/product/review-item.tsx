import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Review } from '../../types/review';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps) {
  const formatDate = (dateString: string) => dayjs(dateString).locale('ru').format('DD MMMM');

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={review.createAt}>{formatDate(review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg key={index} width="17" height="16" aria-hidden="true">
            <use xlinkHref={`#icon-${index < review.rating ? 'full-star' : 'star'}`}></use>
          </svg>
        ))}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;

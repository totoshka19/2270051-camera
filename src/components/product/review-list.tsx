import React from 'react';
import ReviewItem from './review-item';
import { Review } from '../../types/review';

type ReviewListProps = {
  reviews: Review[];
  onShowMore: () => void;
};

function ReviewList({ reviews, onShowMore }: ReviewListProps) {
  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
        </div>
        <ul className="review-block__list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
        {reviews.length > 3 && (
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button" onClick={onShowMore}>Показать больше отзывов</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewList;

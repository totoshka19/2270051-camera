import ReviewItem from './review-item';
import { Review } from '../../types/review';

type ReviewListProps = {
  reviews: Review[];
  onShowMore: () => void;
  showMoreButton: boolean;
};

function ReviewList({ reviews, onShowMore, showMoreButton }: ReviewListProps) {
  return (
    <div className="page-content__section">
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
          {showMoreButton && (
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={onShowMore}>Показать больше отзывов</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ReviewList;

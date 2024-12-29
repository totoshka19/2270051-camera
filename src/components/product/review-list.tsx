import React, { useState } from 'react';
import ReviewItem from './review-item';
import { Review } from '../../types/review';
import PopUpReview from '../pop-up/pop-up-review';
import PopUpCart from '../pop-up/pop-up-cart';

type ReviewListProps = {
  reviews: Review[];
  onShowMore: () => void;
  showMoreButton: boolean;
  cameraId: number;
};

function ReviewList({ reviews, onShowMore, showMoreButton, cameraId }: ReviewListProps) {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isPopUpCartVisible, setIsPopUpCartVisible] = useState(false);
  const [popUpCartProps, setPopUpCartProps] = useState({
    title: '',
    buttonText: '',
    iconType: 'success' as 'success' | 'error',
  });

  const handleOpenPopUp = () => {
    setIsPopUpVisible(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  const handleShowPopUpCart = (title: string, buttonText: string, iconType: 'success' | 'error') => {
    setPopUpCartProps({ title, buttonText, iconType });
    setIsPopUpCartVisible(true);
  };

  const handleClosePopUpCart = () => {
    setIsPopUpCartVisible(false);
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={handleOpenPopUp}>Оставить свой отзыв</button>
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

      {isPopUpVisible && (
        <PopUpReview
          onClose={handleClosePopUp}
          cameraId={cameraId}
          onShowPopUpCart={handleShowPopUpCart}
        />
      )}

      {isPopUpCartVisible && (
        <PopUpCart
          onClose={handleClosePopUpCart}
          title={popUpCartProps.title}
          buttonText={popUpCartProps.buttonText}
          iconType={popUpCartProps.iconType}
        />
      )}
    </div>
  );
}

export default ReviewList;

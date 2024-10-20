import {MAX_RATING_STARS} from '../../conts';
import { getRange } from '../../utils';

type StarRatingProps = {
  rating: number;
  id: string | number;
};

function StarRating({ rating, id }: StarRatingProps) {
  return (
    <>
      {getRange(1, MAX_RATING_STARS).map((starIndex) => (
        <svg key={`${id}-star-${starIndex}`} width="17" height="16" aria-hidden="true">
          <use xlinkHref={`#icon-${starIndex <= rating ? 'full-star' : 'star'}`}></use>
        </svg>
      ))}
    </>
  );
}

export default StarRating;

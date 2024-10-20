import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchSimilarProducts } from '../../store/product-similar-slice';
import ProductCard from '../catalog-cards/product-card';
import Spinner from '../spinner';
import { getNextIndex, getPrevIndex } from '../../utils';
import { RequestStatus, SLIDES_PER_VIEW } from '../../conts';

type ProductSimilarProps = {
  cameraId: number;
};

function ProductSimilar({ cameraId }: ProductSimilarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const similarProducts = useSelector((state: RootState) => state.productSimilar.items);
  const status = useSelector((state: RootState) => state.productSimilar.status);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSimilarProducts(cameraId));
  }, [dispatch, cameraId]);

  if (status === RequestStatus.Loading) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.Failed) {
    return <Spinner loading={false} error />;
  }

  if (similarProducts.length === 0) {
    return null;
  }

  const handlePrevClick = () => {
    const newIndex = getPrevIndex(currentIndex, SLIDES_PER_VIEW);
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = getNextIndex(currentIndex, similarProducts.length, SLIDES_PER_VIEW);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={index >= currentIndex && index < currentIndex + SLIDES_PER_VIEW ? 'is-active' : ''}
                />
              ))}
            </div>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={handlePrevClick}
              disabled={currentIndex === 0}
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleNextClick}
              disabled={currentIndex >= similarProducts.length - SLIDES_PER_VIEW}
              style={{ pointerEvents: 'auto' }}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilar;

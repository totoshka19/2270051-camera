import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchSimilarProducts } from '../../store/product-similar-slice';
import { RequestStatus } from '../../conts';
import ProductCard from '../catalog-cards/product-card';

type ProductSimilarProps = {
  cameraId: number;
};

function ProductSimilar({ cameraId }: ProductSimilarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const similarProducts = useSelector((state: RootState) => state.productSimilar.items);
  const status = useSelector((state: RootState) => state.productSimilar.status);
  const error = useSelector((state: RootState) => state.productSimilar.error);

  useEffect(() => {
    dispatch(fetchSimilarProducts(cameraId));
  }, [dispatch, cameraId]);

  if (status === RequestStatus.Loading) {
    return <div>Загрузка...</div>;
  }

  if (status === RequestStatus.Failed) {
    return <div>{error}</div>;
  }

  if (similarProducts.length === 0) {
    return null;
  }

  const handlePrevClick = () => {
    const slider = document.querySelector('.product-similar__slider-list') as HTMLElement;
    if (slider) {
      slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    const slider = document.querySelector('.product-similar__slider-list') as HTMLElement;
    if (slider) {
      slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} className="is-active" />
              ))}
            </div>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={handlePrevClick}>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={handleNextClick}>
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

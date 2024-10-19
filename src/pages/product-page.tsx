import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import ProductInfo from '../components/product/product-info';
import ReviewList from '../components/product/review-list';
import ScrollToTopButton from '../components/scroll-to-top-button';
import { AppDispatch, RootState } from '../store/store';
import { fetchProduct } from '../store/product-slice';
import { fetchReviews } from '../store/reviews-slice';
import { AppRoute, NUMBER_OF_REVIEWS, RequestStatus } from '../conts';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.item);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const productStatus = useSelector((state: RootState) => state.product.status);
  const reviewsStatus = useSelector((state: RootState) => state.reviews.status);
  const [visibleReviews, setVisibleReviews] = useState(NUMBER_OF_REVIEWS);

  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
    dispatch(fetchReviews(Number(id)));
  }, [dispatch, id]);

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + NUMBER_OF_REVIEWS);
  };

  if (productStatus === RequestStatus.Loading || reviewsStatus === RequestStatus.Loading) {
    return <div className="container title title--h2">Получение информации о товаре...</div>;
  }

  if (productStatus === RequestStatus.Failed || !product) {
    return <div className="container title title--h2">Ошибка получения информации о товаре</div>;
  }

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  const showMoreButton = sortedReviews.length > visibleReviews;

  return (
    <>
      <Helmet>
        <title>{product.name} - Фотошоп</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <ProductInfo product={product} />
            </div>
            <div className="page-content__section">
              <ReviewList
                reviews={sortedReviews.slice(0, visibleReviews)}
                onShowMore={handleShowMoreReviews}
                showMoreButton={showMoreButton}
              />
            </div>
          </div>
        </main>
        <ScrollToTopButton />
      </Layout>
    </>
  );
}

export default ProductPage;

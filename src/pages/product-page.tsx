import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import ProductInfo from '../components/product/product-info';
import ReviewList from '../components/product/review-list';
import ScrollToTopButton from '../components/scroll-to-top-button';
import Spinner from '../components/spinner';
import ProductSimilar from '../components/product/product-similar';
import { AppDispatch, RootState } from '../store/store';
import { fetchProduct } from '../store/product-slice';
import { fetchReviews } from '../store/reviews-slice';
import { AppRoute, NUMBER_OF_REVIEWS, RequestStatus } from '../conts';
import { sortReviewsByDate } from '../utils';

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
    return (
      <Layout>
        <Spinner loading error={false} />
      </Layout>
    );
  }

  if (productStatus === RequestStatus.Failed || !product) {
    return (
      <Layout>
        <Spinner loading={false} error />
      </Layout>
    );
  }

  const sortedReviews = sortReviewsByDate(reviews);

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

            <ProductInfo product={product} />

            <ProductSimilar cameraId={product.id} />

            <ReviewList
              reviews={sortedReviews.slice(0, visibleReviews)}
              onShowMore={handleShowMoreReviews}
              showMoreButton={showMoreButton}
            />

          </div>
        </main>
        <ScrollToTopButton />
      </Layout>
    </>
  );
}

export default ProductPage;

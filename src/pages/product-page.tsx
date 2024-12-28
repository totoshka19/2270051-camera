import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import ProductInfo from '../components/product/product-info';
import ReviewList from '../components/product/review-list';
import ScrollToTopButton from '../components/scroll-to-top-button';
import Spinner from '../components/spinner';
import ProductSimilar from '../components/product/product-similar';
import { AppDispatch } from '../store/store';
import { fetchProduct } from '../store/product-slice';
import { fetchReviews } from '../store/reviews-slice';
import { BREADCRUMBS_PRODUCT, NUMBER_OF_REVIEWS, RequestStatus } from '../conts';
import { sortReviewsByDate } from '../utils';
import { RootState } from '../store/root-reducer';

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

  const breadcrumbs = BREADCRUMBS_PRODUCT(product.name);

  return (
    <>
      <Helmet>
        <title>{product.name} - Фотошоп</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <Breadcrumbs items={breadcrumbs} />

            <ProductInfo product={product} />

            <ProductSimilar cameraId={product.id} />

            <ReviewList
              reviews={sortedReviews.slice(0, visibleReviews)}
              onShowMore={handleShowMoreReviews}
              showMoreButton={showMoreButton}
              cameraId={product.id}
            />

          </div>
        </main>
        <ScrollToTopButton />
      </Layout>
    </>
  );
}

export default ProductPage;

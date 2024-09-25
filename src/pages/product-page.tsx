import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout';
import ProductInfo from '../components/product/product-info';
import ReviewList from '../components/product/review-list';
import { AppDispatch, RootState } from '../store/store';
import { fetchProduct } from '../store/product-slice';
import { fetchReviews } from '../store/reviews-slice';
import { RequestStatus } from '../conts';

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.item);
  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const productStatus = useSelector((state: RootState) => state.product.status);
  const reviewsStatus = useSelector((state: RootState) => state.reviews.status);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
    dispatch(fetchReviews(Number(id)));
  }, [dispatch, id]);

  const handleShowMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  if (productStatus === RequestStatus.Loading || reviewsStatus === RequestStatus.Loading) {
    return <div>Получение информации о товаре...</div>;
  }

  if (productStatus === RequestStatus.Failed || !product) {
    return <div>Ошибка получения информации о товаре</div>;
  }

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
                    <a className="breadcrumbs__link" href="/">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="/catalog">Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{product.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <ProductInfo product={product} />
            </div>
            <div className="page-content__section">
              <ReviewList reviews={reviews.slice(0, visibleReviews)} onShowMore={handleShowMoreReviews} />
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        >
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
      </Layout>
    </>
  );
}

export default ProductPage;

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import BasketList from '../components/basket/basket-list';
import { AppRoute, BREADCRUMBS_BASKET } from '../conts';
import { formatPrice } from '../utils';

function BasketPage() {
  const navigate = useNavigate();
  const basketItems = useSelector((state: RootState) => state.basket.items);

  useEffect(() => {
    if (basketItems.length === 0) {
      navigate(AppRoute.Catalog);
    }
  }, [basketItems, navigate]);

  const totalPrice = basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <Breadcrumbs items={BREADCRUMBS_BASKET} />

            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <BasketList />

                <div className="basket__summary">
                  <div className="basket__promo">
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">{formatPrice(totalPrice)}</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                      <span className="basket__summary-value basket__summary-value--total">{formatPrice(totalPrice)}</span>
                    </p>
                    <button className="btn btn--purple" type="submit">Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default BasketPage;

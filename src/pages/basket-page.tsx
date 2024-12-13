import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import BasketList from '../components/basket/basket-list';
import { BREADCRUMBS_BASKET } from '../conts';

function BasketPage() {
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
                      <span className="basket__summary-value">111 390 ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                      <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
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

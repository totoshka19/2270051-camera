import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import BasketList from '../components/basket/basket-list';
import Loader from '../components/loader/loader';
import PopUpCart from '../components/pop-up/pop-up-cart';
import { BREADCRUMBS_BASKET } from '../conts';
import { calculateDiscount, formatPrice } from '../utils';
import { RootState } from '../store/root-reducer';
import { createOrder } from '../store/order-slice';
import { clearBasket } from '../store/basket-slice';
import { Order } from '../types/order';
import { AppDispatch } from '../store/store';

function BasketPage() {
  const dispatch = useDispatch<AppDispatch>();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState('Спасибо за покупку');
  const [popUpButtonText, setPopUpButtonText] = useState('Вернуться к покупкам');
  const totalPrice = basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalQuantity = basketItems.reduce((total, item) => total + item.quantity, 0);
  const discountPercentage = calculateDiscount(totalPrice, totalQuantity);
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount;
  const [isError, setIsError] = useState(false);

  const handleOrderSubmit = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const orderData: Order = {
        camerasIds: basketItems.map((item) => item.product.id),
        coupon: null,
      };
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearBasket());
      setPopUpTitle('Спасибо за покупку');
      setPopUpButtonText('Вернуться к покупкам');
      setIsPopUpVisible(true);
    } catch {
      setIsError(true);
      setPopUpTitle('Возникла ошибка');
      setPopUpButtonText('Попробуйте позже');
      setIsPopUpVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopUpClose = () => {
    setIsPopUpVisible(false);
  };

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
                  <div className="basket__promo"></div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">{formatPrice(totalPrice)}</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className={`basket__summary-value ${discountAmount > 0 ? 'basket__summary-value--bonus' : ''}`}>
                        {formatPrice(discountAmount)}
                      </span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                      <span className="basket__summary-value basket__summary-value--total">{formatPrice(finalPrice)}</span>
                    </p>
                    <button
                      className="btn btn--purple"
                      type="submit"
                      onClick={() => void handleOrderSubmit()}
                      disabled={isLoading || basketItems.length === 0}
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>

      {isLoading && <Loader />}

      {isPopUpVisible && (
        <PopUpCart
          onClose={handlePopUpClose}
          title={popUpTitle}
          buttonText={popUpButtonText}
          iconType={isError ? 'error' : 'success'}
        />
      )}
    </>
  );
}

export default BasketPage;

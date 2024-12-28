import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import BasketList from '../components/basket/basket-list';
import Loader from '../components/loader/loader';
import PopUpCart from '../components/pop-up/pop-up-cart';
import { AppDispatch } from '../store/store';
import { RootState } from '../store/root-reducer';
import { createOrder } from '../store/order-slice';
import { clearBasket } from '../store/basket-slice';
import {
  BREADCRUMBS_BASKET,
  ORDER_ERROR_MESSAGE,
  ORDER_ERROR_BUTTON_TEXT,
  ORDER_SUCCESS_BUTTON_TEXT,
  ORDER_SUCCESS_TITLE,
  AppRoute
} from '../conts';
import { calculateDiscount, formatPrice } from '../utils';
import { Order } from '../types/order';

function BasketPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState(ORDER_SUCCESS_TITLE);
  const [popUpButtonText, setPopUpButtonText] = useState(ORDER_SUCCESS_BUTTON_TEXT);
  const totalPrice = basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalQuantity = basketItems.reduce((total, item) => total + item.quantity, 0);
  const discountPercentage = calculateDiscount(totalPrice, totalQuantity);
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount;
  const [isError, setIsError] = useState(false);
  const [isOrderButtonClicked, setIsOrderButtonClicked] = useState(false);

  useEffect(() => {
    if (basketItems.length === 0 && !isOrderButtonClicked) {
      navigate(AppRoute.Catalog);
    }
  }, [basketItems, isOrderButtonClicked, navigate]);

  const handleOrderSubmit = async () => {
    setIsLoading(true);
    setIsError(false);
    setIsOrderButtonClicked(true);

    try {
      const orderData: Order = {
        camerasIds: basketItems.map((item) => item.product.id),
        coupon: null,
      };
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearBasket());
      setPopUpTitle(ORDER_SUCCESS_TITLE);
      setPopUpButtonText(ORDER_SUCCESS_BUTTON_TEXT);
      setIsPopUpVisible(true);
    } catch {
      setIsError(true);
      setPopUpTitle(ORDER_ERROR_MESSAGE);
      setPopUpButtonText(ORDER_ERROR_BUTTON_TEXT);
      setIsPopUpVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopUpClose = () => {
    setIsPopUpVisible(false);
    if (basketItems.length === 0) {
      navigate(AppRoute.Catalog);
    }
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

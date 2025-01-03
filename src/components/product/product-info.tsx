import { useState } from 'react';
import Rating from '../rating/rating';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils';
import PopUpAddToCart from '../pop-up/pop-up-add-to-cart';
import PopUpAddToCartSuccess from '../pop-up/pop-up-add-to-cart-success';

type ProductInfoProps = {
  product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [isAddToCartPopupOpen, setAddToCartPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddToCartClick = () => {
    setAddToCartPopupOpen(true);
  };

  const handleCloseAddToCartPopup = () => {
    setAddToCartPopupOpen(false);
  };

  const handleCloseSuccessPopup = () => {
    setSuccessPopupOpen(false);
  };

  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`} />
              <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="560" height="480" alt={product.name} />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{product.name}</h1>
            <Rating product={product} />
            <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(product.price)}</p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleAddToCartClick}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
            {isAddToCartPopupOpen && (
              <PopUpAddToCart
                product={product}
                onClose={handleCloseAddToCartPopup}
                onSuccess={() => setSuccessPopupOpen(true)}
              />
            )}
            {isSuccessPopupOpen && (
              <PopUpAddToCartSuccess onClose={handleCloseSuccessPopup} />
            )}
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  className={`tabs__control ${activeTab === 'characteristics' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => handleTabChange('characteristics')}
                >
                  Характеристики
                </button>
                <button
                  className={`tabs__control ${activeTab === 'description' ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => handleTabChange('description')}
                >
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={`tabs__element ${activeTab === 'characteristics' ? 'is-active' : ''}`}>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text">{product.vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{product.category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{product.type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{product.level}</p>
                    </li>
                  </ul>
                </div>
                <div className={`tabs__element ${activeTab === 'description' ? 'is-active' : ''}`}>
                  <div className="product__tabs-text">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductInfo;

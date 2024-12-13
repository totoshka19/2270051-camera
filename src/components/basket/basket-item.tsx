import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromBasket } from '../../store/basket-slice';
import { BasketItem as BasketItemType } from '../../types/basket';

type BasketItemProps = {
  item: BasketItemType;
};

function BasketItem({ item }: BasketItemProps) {
  const dispatch = useDispatch();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveClick = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${item.product.previewImgWebp}, /${item.product.previewImgWebp2x} 2x`} />
          <img src={`/${item.product.previewImg}`} srcSet={`/${item.product.previewImg2x} 2x`} width="140" height="120" alt={item.product.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{item.product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{item.product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{item.product.category}</li>
          <li className="basket-item__list-item">{item.product.level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{item.product.price} ₽</p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
          disabled={item.quantity === 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${item.product.id}`}></label>
        <input
          type="number"
          id={`counter${item.product.id}`}
          value={item.quantity}
          min="1"
          max="99"
          aria-label="количество товара"
          onChange={(e) => handleQuantityChange(item.product.id, Number(e.target.value))}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{item.product.price * item.quantity} ₽</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => handleRemoveClick(item.product.id)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;

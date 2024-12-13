import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addToBasket, selectIsProductInBasket } from '../store/basket-slice';
import { Product } from '../types/product';

type AddToCartButtonProps = {
  product: Product;
  onSuccess?: () => void;
  className?: string;
};

function AddToCartButton({ product, onSuccess, className = '' }: AddToCartButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isInCart = useSelector((state: RootState) => selectIsProductInBasket(state, product.id));

  const handleAddToCart = () => {
    dispatch(addToBasket(product));

    if (onSuccess) {
      onSuccess();
    }
  };

  return isInCart ? (
    <button className={`btn btn--purple-border ${className}`} type="button" disabled>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      В корзине
    </button>
  ) : (
    <button
      className={`btn btn--purple ${className}`}
      type="button"
      onClick={handleAddToCart}
    >
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>
  );
}

export default AddToCartButton;

// !TODO возможно этот компонент не нужен

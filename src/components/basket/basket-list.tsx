import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BasketItem from './basket-item';

function BasketList() {
  const basketItems = useSelector((state: RootState) => state.basket.items);

  return (
    <ul className="basket__list">
      {basketItems.map((item) => (
        <BasketItem key={item.product.id} item={item} />
      ))}
    </ul>
  );
}

export default BasketList;

import { useSelector } from 'react-redux';
import BasketItem from './basket-item';
import { RootState } from '../../store/root-reducer';

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

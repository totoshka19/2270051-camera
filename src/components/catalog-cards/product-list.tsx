import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './product-card';
import { fetchProducts } from '../../store/products-slice';
import { AppDispatch, RootState } from '../../store/store';
import { RequestStatus } from '../../conts';
import Spinner from '../spinner';

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === RequestStatus.Loading) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.Failed) {
    return <Spinner loading={false} error />;
  }

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

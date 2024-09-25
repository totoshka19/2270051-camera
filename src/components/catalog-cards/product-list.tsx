import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './product-card';
import { fetchProducts } from '../../store/products-slice';
import { AppDispatch, RootState } from '../../store/store';
import { RequestStatus } from '../../conts';

function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === RequestStatus.Loading) {
    return <div>Получение списка товаров...</div>;
  }

  if (status === RequestStatus.Failed) {
    return <div>Ошибка: {error}</div>;
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

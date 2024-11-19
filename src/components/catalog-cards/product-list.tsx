import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './product-card';
import Spinner from '../spinner';
import { fetchProducts } from '../../store/products-slice';
import { AppDispatch, RootState } from '../../store/store';
import { RequestStatus, SortDirection, SortType } from '../../conts';
import { SortParams } from '../../types/sorting';
import { Product } from '../../types/product';

type ProductListProps = {
  sortParams: SortParams;
};

function ProductList({ sortParams }: ProductListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const sorted = [...products].sort((a, b) => {
        if (sortParams.type === SortType.Price) {
          return sortParams.direction === SortDirection.Asc ? a.price - b.price : b.price - a.price;
        } else if (sortParams.type === SortType.Popular) {
          return sortParams.direction === SortDirection.Asc ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
      });
      setSortedProducts(sorted);
    }
  }, [products, sortParams]);

  if (status === RequestStatus.Loading) {
    return <Spinner loading error={false} />;
  }

  if (status === RequestStatus.Failed) {
    return <Spinner loading={false} error />;
  }

  return (
    <div className="cards catalog__cards">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

import { Product } from '../../types/product';
import { formatPrice } from '../../utils';

type ProductInfoProps = {
  product: Product;
}

function ProductInfoShort({ product }: ProductInfoProps) {
  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`} />
          <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="140" height="120" alt={product.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{product.category}</li>
          <li className="basket-item__list-item">{product.level}</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

export default ProductInfoShort;

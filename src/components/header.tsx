import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FormSearch from './form-search/form-search';
import { AppRoute } from '../conts';
import { RootState } from '../store/root-reducer';

function Header() {
  const basketItemsCount = useSelector((state: RootState) =>
    state.basket.items.reduce((total, item) => total + item.quantity, 0)
  );

  const basketLink = basketItemsCount > 0 ? AppRoute.Card : AppRoute.Catalog;

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link
          className="header__basket-link"
          to={basketLink}
          aria-label="Переход в корзину"
        >
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketItemsCount > 0 && (
            <span className="header__basket-count">{basketItemsCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;

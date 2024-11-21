import {useSelector} from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Slider from '../components/slider/slider';
import ProductList from '../components/catalog-cards/product-list';
import Sorting from '../components/sorting';
import Filter from '../components/filter';
import {RootState} from '../store/store';
import { AppRoute } from '../conts';

function CatalogPage() {
  const sortParams = useSelector((state: RootState) => state.sorting);

  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>

      <Layout>
        <main>
          <Slider />
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <Filter />
                  </div>
                  <div className="catalog__content">
                    <Sorting />
                    <ProductList sortParams={sortParams} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default CatalogPage;

import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import Breadcrumbs from '../components/breadcrumbs';
import Slider from '../components/slider/slider';
import ProductList from '../components/catalog-cards/product-list';
import Sorting from '../components/sorting';
import Filter from '../components/filter';
import { RootState } from '../store/store';
import { BREADCRUMBS_CATALOG } from '../conts';

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
            <Breadcrumbs items={BREADCRUMBS_CATALOG} />
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

import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CatalogPage from '../pages/catalog-page';
import ProductPage from '../pages/product-page';
import BasketPage from '../pages/basket-page';
import NotFoundPage from '../pages/not-found-page';
import { AppRoute } from '../conts';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          <Route path={AppRoute.Camera} element={<ProductPage />} />
          <Route path={AppRoute.Card} element={<BasketPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchResults, clearSearchResults } from '../../store/search-slice';
import { AppDispatch, RootState } from '../../store/store';
import { filterProducts } from '../../utils';
import { MIN_SEARCH_LENGTH, RequestStatus } from '../../conts';
import './form-search.css';

// !TODO Выпадающий список с результатами поиска поддерживает навигацию с помощью клавиатуры: стрелки, клавиша Tab.

function FormSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { results, status } = useSelector((state: RootState) => state.search);
  const allProducts = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      const filteredResults = filterProducts(allProducts, searchTerm);
      dispatch(setSearchResults(filteredResults));
    } else {
      dispatch(clearSearchResults());
    }
  }, [searchTerm, allProducts, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearClick = () => {
    setSearchTerm('');
  };

  const shouldShowDropdown = status === RequestStatus.Succeeded && searchTerm.length >= MIN_SEARCH_LENGTH && results.length > 0;

  return (
    <div className="form-search">
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </label>
        {shouldShowDropdown && (
          <ul className={`form-search__select-list ${shouldShowDropdown ? 'open' : ''}`}>
            {results.map((product) => (
              <li
                key={product.id}
                className="form-search__select-item"
                tabIndex="0"
              >
                <Link className="form-search__select-link" to={`/camera/${product.id}`} onClick={() => (product.id)}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>
      {searchTerm && (
        <button className="form-search__reset visible" type="button" onClick={handleClearClick}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      )}
    </div>
  );
}

export default FormSearch;

import {FilterState} from '../types/state';
import React, {useEffect, useState} from 'react';
import {ProductLevel, ProductType} from '../conts';

const initialFilters: FilterState = {
  price: { min: '', max: '' },
  category: '',
  cameraType: {
    Collectible: false,
    Instant: false,
    Digital: false,
    Film: false,
  },
  level: {
    Zero: false,
    Amateur: false,
    Professional: false,
  },
};

function Filter() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isResetDisabled, setIsResetDisabled] = useState(true);

  useEffect(() => {
    const { price, category, cameraType, level } = filters;
    const hasFilters = (price.min !== '' || price.max !== '') ||
      category !== '' ||
      Object.values(cameraType).some((value) => value) ||
      Object.values(level).some((value) => value);

    setIsResetDisabled(!hasFilters);
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    const [filterType, filterName] = name.split('.');

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType || name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="catalog-filter">
      <form action="src/components/filter#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price.min"
                  placeholder="от"
                  value={filters.price.min}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price.max"
                  placeholder="до"
                  value={filters.price.max}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="PhotoCamera"
                checked={filters.category === 'PhotoCamera'}
                onChange={handleChange}
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Фотоаппарат</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="VideoCamera"
                checked={filters.category === 'VideoCamera'}
                onChange={handleChange}
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {Object.entries(ProductType).map(([key, label]) => (
            <div className="custom-checkbox catalog-filter__item" key={key}>
              <label>
                <input
                  type="checkbox"
                  name={`cameraType.${key}`}
                  checked={filters.cameraType[key as keyof typeof ProductType]}
                  onChange={handleChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{label}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {Object.entries(ProductLevel).map(([key, label]) => (
            <div className="custom-checkbox catalog-filter__item" key={key}>
              <label>
                <input
                  type="checkbox"
                  name={`level.${key}`}
                  checked={filters.level[key as keyof typeof ProductLevel]}
                  onChange={handleChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{label}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="button"
          onClick={handleReset}
          disabled={isResetDisabled}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filter;

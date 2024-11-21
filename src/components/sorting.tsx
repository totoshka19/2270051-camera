import React, { useState } from 'react';
import { SortDirection, SortType } from '../conts';

type SortingProps = {
  onSortChange: (type: string, direction: string) => void;
};

function Sorting({ onSortChange }: SortingProps) {
  const [sortType, setSortType] = useState<string>(SortType.Price);
  const [sortDirection, setSortDirection] = useState<string>(SortDirection.Asc);

  const handleSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortType = event.target.id === 'sortPrice' ? SortType.Price : SortType.Popular;
    setSortType(newSortType);
    onSortChange(newSortType, sortDirection);
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirection = event.target.id === 'up' ? SortDirection.Asc : SortDirection.Desc;
    setSortDirection(newDirection);
    onSortChange(sortType, newDirection);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                defaultChecked
                onChange={handleSortTypeChange}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                onChange={handleSortTypeChange}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                defaultChecked
                aria-label="По возрастанию"
                onChange={handleSortDirectionChange}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                onChange={handleSortDirectionChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;

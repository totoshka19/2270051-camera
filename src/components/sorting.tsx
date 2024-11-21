import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortDirection, setSortType } from '../store/sorting-slice';
import { RootState } from '../store/store';
import { SortDirection, SortType } from '../conts';

type SortingProps = {
  onSortChange?: (type: string, direction: string) => void;
};

function Sorting({ onSortChange }: SortingProps) {
  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.sorting.type);
  const sortDirection = useSelector((state: RootState) => state.sorting.direction);

  const handleSortTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortType = event.target.id === SortType.Price ? SortType.Price : SortType.Popular;
    dispatch(setSortType(newSortType));
    if (onSortChange) {
      onSortChange(newSortType, sortDirection);
    }
  };

  const handleSortDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirection = event.target.id === SortDirection.Asc ? SortDirection.Asc : SortDirection.Desc;
    dispatch(setSortDirection(newDirection));
    if (onSortChange) {
      onSortChange(sortType, newDirection);
    }
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
                id={SortType.Price}
                name="sort"
                defaultChecked={sortType === SortType.Price}
                onChange={handleSortTypeChange}
              />
              <label htmlFor={SortType.Price}>по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id={SortType.Popular}
                name="sort"
                defaultChecked={sortType === SortType.Popular}
                onChange={handleSortTypeChange}
              />
              <label htmlFor={SortType.Popular}>по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id={SortDirection.Asc}
                name="sort-icon"
                defaultChecked={sortDirection === SortDirection.Asc}
                aria-label="По возрастанию"
                onChange={handleSortDirectionChange}
              />
              <label htmlFor={SortDirection.Asc}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id={SortDirection.Desc}
                name="sort-icon"
                defaultChecked={sortDirection === SortDirection.Desc}
                aria-label="По убыванию"
                onChange={handleSortDirectionChange}
              />
              <label htmlFor={SortDirection.Desc}>
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

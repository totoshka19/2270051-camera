import { Link } from 'react-router-dom';
import { Breadcrumb } from '../types/breadcrumb';

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {items.map((item) => {
            const key = item.link ? `${item.label}-${item.link}` : `${item.label}-active`;

            return (
              <li className="breadcrumbs__item" key={key}>
                {item.link ? (
                  <Link className="breadcrumbs__link" to={item.link}>
                    {item.label}
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                ) : (
                  <span className="breadcrumbs__link breadcrumbs__link--active">{item.label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;

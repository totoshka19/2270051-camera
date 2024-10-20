import React from 'react';
import { Link } from 'react-router-dom';

function ScrollToTopButton() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      className="up-btn"
      to="#"
      onClick={handleScrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
      }}
    >
      <svg width="12" height="18" aria-hidden="true">
        <use xlinkHref="#icon-arrow2"></use>
      </svg>
    </Link>
  );
}

export default ScrollToTopButton;

import React from 'react';
import './loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader__spinner"></div>
      </div>
    </div>
  );
}

export default Loader;

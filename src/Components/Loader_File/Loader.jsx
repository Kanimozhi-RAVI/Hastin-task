import React from 'react';
import '../Loader_File/Loader.css'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="ring-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader

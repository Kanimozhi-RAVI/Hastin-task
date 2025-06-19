import React from 'react';
import '../Loader_File/Loader.css';

const Loader = ({ inline = false }) => {
  return (
    <div className={inline ? 'inline-loader' : 'loader-overlay'}>
      <div className="ring-loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;

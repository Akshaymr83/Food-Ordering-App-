import React from 'react';
import './Loader.css'; // Make sure to import your CSS file

const Loader = () => {
  return (
    <div className="loaderBox"> {/* Fixed 'classname' to 'className' */}
      <figure className="loader-container">
        <div className="loader-dot white"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </figure>
    </div>
  );
};

export default Loader;

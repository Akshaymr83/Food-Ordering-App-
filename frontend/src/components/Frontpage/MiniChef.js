
import React, { useState, useEffect } from 'react';
import './MiniChef.css'; // CSS for styling
import boyImage from '../Images/boy.png'; // Path to your boy image

const MiniChef = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showText, setShowText] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Show the text after the image slides into place
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Delay for text to fade in after image

    // Automatically close after 4 seconds
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 700000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    isVisible && (
      <div className="mini-chef-overlay">
        <button className="close-button" onClick={handleClose}>&times;</button>
        <div className="mini-chef__content">
          <img src={boyImage} alt="Boy" className="mini-chef__img" />
          {showText && <div className="mini-chef__welcome-text"><h3 id='welcome'>WELCOME TO</h3> <h1 className='foodmood'>FOOD <span id='mood'>MOOD </span></h1></div>}
        </div>
      </div>
    )
  );
};

export default MiniChef;

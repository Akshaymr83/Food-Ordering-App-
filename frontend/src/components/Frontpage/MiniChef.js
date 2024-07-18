// MiniChef.js
import React, { useState, useEffect } from 'react';
import './MiniChef.css'; // Import the CSS file for styling
import miniChefImg from '../Images/MiniChef1.jpg'; // Path to your miniature chef image

const MiniChef = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState([
    'Welcome to FOOD MOOD',
    'Explore our delicious menu!',
    'Place your order and enjoy!'
  ]);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, (messages.length + 1) * 3000); // Automatically close after all messages are displayed

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    isVisible && (
      <div className="mini-chef">
        <button className="close-button" onClick={handleClose}>&times;</button>
        <div className="mini-chef__content">
          <img src={miniChefImg} alt="Mini Chef" className="mini-chef__img" />
          <div className="mini-chef__speech-container">
            {messages.map((message, index) => (
              <div key={index} className="mini-chef__speech-bubble">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MiniChef;

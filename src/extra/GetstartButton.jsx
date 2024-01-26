import React, { useState } from 'react';
import './GetstartButton.css';

const GetstartButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='btn-div'>
    <button
      className={`custom-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className='btn-text'>Get Start</p>
    </button>
    </div>
  );
};

export default GetstartButton;
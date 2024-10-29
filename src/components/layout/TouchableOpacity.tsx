import React, { useState } from 'react';

const TouchableOpacity = ({ children, onClick, style, activeOpacity = 0.6 }:any) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const touchableStyle = {
    opacity: isPressed ? activeOpacity : 1,
    transition: 'opacity 0.2s',
    cursor: 'pointer',
    ...style,
  };

  return (
    <div
      style={touchableStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TouchableOpacity;
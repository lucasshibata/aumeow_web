import React, { useState } from 'react';

export default function TouchableOpacity ({ children, onClick, activeOpacity = 0.6 }:any){
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const touchableStyle:React.CSSProperties = {
    opacity: isPressed ? activeOpacity : 1,
    transition: 'opacity 0.4s',
    cursor: 'pointer',
    display:'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
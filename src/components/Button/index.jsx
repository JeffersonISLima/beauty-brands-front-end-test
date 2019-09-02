import React from 'react';

const Button = ({type, className, onClick, children, disabled }) => {
  return(
    <button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</button>
  );
}

export default Button;
 

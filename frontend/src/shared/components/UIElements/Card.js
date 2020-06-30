import React from 'react';

import s from './Card.module.scss';

const Card = ({ className, style, children }) => {
  return (
    <div className={`${s.card} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;

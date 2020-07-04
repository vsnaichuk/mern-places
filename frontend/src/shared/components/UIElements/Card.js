import React from 'react';
import cx from 'classnames';

import s from './Card.module.scss';

const Card = ({ className, style, children }) => {
  return (
    <div className={cx(s.card, className)} style={style}>
      {children}
    </div>
  );
};

export default Card;

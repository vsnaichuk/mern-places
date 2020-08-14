import cx from 'classnames';
import React from 'react';
import s from './Card.module.scss';

const Card = ({ center, className, style, children }) => {
  const el = (
    <div className={cx(s.card, className)} style={style}>
      {children}
    </div>
  );

  if (center) return <div className={s.center}>{el}</div>;

  return el;
};

export default Card;

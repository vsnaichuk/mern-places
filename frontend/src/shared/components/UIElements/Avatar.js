import React from 'react';
import cx from 'classnames';
import s from './Avatar.module.scss';

const Avatar = ({
  className,
  style,
  image,
  alt,
  width,
  ...props
}) => {
  return (
    <div className={cx(s.avatar, className)} style={style}>
      <img
        src={image}
        alt={alt}
        style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;

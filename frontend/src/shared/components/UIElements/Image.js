import React from 'react';

const Image = ({ type, ...props }) => {
  const changeSrc = (e) => {
    if (type === 'user') {
      e.target.src = '/icons/user-placeholder.png';
    }
    if (!type) {
      e.target.src = '/icons/no-image.png';
    }
  };

  return <img onError={changeSrc} {...props} />;
};

export default Image;

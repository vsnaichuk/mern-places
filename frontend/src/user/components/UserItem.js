import React from 'react';
import s from './UserItem.module.scss';

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <li>
      <span>ID: {id}</span>
      <h2>Name: {name}</h2>
      <img src={image} className={s.image} alt={name} />
      <span>Place count: {placeCount}</span>
    </li>
  );
};

export default UserItem;

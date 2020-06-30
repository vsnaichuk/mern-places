import React from 'react';
import { Link } from 'react-router-dom';
import s from './UserItem.module.scss';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <li className={s.userItem}>
      <Card className={s.userContent}>
        <Link to={`/${id}/places`}>
          <Avatar image={image} className={s.userImage} alt={name} />

          <div className={s.userInfo}>
            <h2>Name: {name}</h2>
            <h3>
              Place count: {placeCount}{' '}
              {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

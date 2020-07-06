import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { routes } from '../../routes';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';
import s from './UserItem.module.scss';

const UserItem = ({ id, name, image, placeCount }) => {
  return (
    <li className={s.userItem}>
      <Card className={s.userContent}>
        <Link to={generatePath(routes.USER_PLACES, { userId: id })}>
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

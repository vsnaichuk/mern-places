import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
import s from './UsersList.module.scss';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card center>
        <h2>No users found</h2>
      </Card>
    );
  }

  return (
    <ul className={s.usersList}>
      {items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;

import React from 'react';
import s from './UsersList.module.scss';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
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
            placeCount={user.placeCount}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;

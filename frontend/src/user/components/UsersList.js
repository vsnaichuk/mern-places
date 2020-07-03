import React from 'react';
import s from './UsersList.module.scss';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card>
        <h2 className="center">No users found</h2>
      </Card>
    );
  }

  return (
    <ul className={s.usersList}>
      {items.map((user) => {
        return <UserItem key={user.id} {...user} />;
      })}
    </ul>
  );
};

export default UsersList;

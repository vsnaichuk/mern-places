import React from 'react';
import UserItem from './UserItem';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return <h2 className="center">No users found</h2>;
  }

  return (
    <ul>
      {items.map((user) => {
        return <UserItem key={user.id} {...user} />;
      })}
    </ul>
  );
};

export default UsersList;

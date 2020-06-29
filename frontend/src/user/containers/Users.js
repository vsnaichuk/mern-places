import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 1,
      name: 'Vova',
      image:
        'https://webstockreview.net/images/friendly-clipart-random-person-3.png',
      placeCount: 2,
    },
    {
      id: 2,
      name: 'Ivan',
      image:
        'https://webstockreview.net/images/friendly-clipart-random-person-6.png',
      placeCount: 4,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;

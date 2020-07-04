import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Vova',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      placeCount: 12,
    },
    {
      id: 'u2',
      name: 'Ivan',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      placeCount: 4,
    },
  ];

  return <UsersList items={DUMMY_USERS} />;
};

export default Users;

import React, { useEffect } from 'react';
import { apiUrl } from '../../shared/api';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useHttpClient } from '../../shared/hooks/httpHook';
import UsersList from '../components/UsersList';

const Users = () => {
  const [sendRequest, data, isLoading] = useHttpClient();

  useEffect(() => {
    const fetchUsers = () => {
      sendRequest(apiUrl.USERS);
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  if (!data?.users) {
    return null;
  }

  return <UsersList items={data.users} />;
};

export default Users;

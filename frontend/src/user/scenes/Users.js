import React, { useEffect } from 'react';
import { useUsers } from '../../shared/api/hooks/usersHook';
import Card from '../../shared/components/UIElements/Card';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import UsersList from '../components/UsersList';

const Users = () => {
  const [data, isLoading, error, errMessage] = useUsers();
  const { addToast } = useToastContext();

  useEffect(() => {
    if (error) {
      addToast('danger', errMessage || 'Something went wrong');
    }
  }, [error, addToast]);

  if (!data?.users && !isLoading) {
    return (
      <Card center>
        <h2>Users not found</h2>
      </Card>
    );
  }

  if (isLoading) {
    return <Spinner center />;
  }

  return <UsersList items={data.users} />;
};

export default Users;

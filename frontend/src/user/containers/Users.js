import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import Api from '../../shared/api';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import UsersList from '../components/UsersList';

const Users = () => {
  const { urls } = Api;
  const { addToast } = useToastContext();
  const [{ data, loading, error }] = useAxios(urls.USERS);

  useEffect(() => {
    if (error) {
      addToast({
        messageType: 'danger',
        content: error.response?.data || 'Something went wrong',
      });
    }
  }, [error, addToast]);

  if (loading) {
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

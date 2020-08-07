import React, { useEffect } from 'react';
import { useUsers } from '../../shared/api/hooks/usersHook';
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

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return <>{data?.users && <UsersList items={data.users} />}</>;
};

export default Users;

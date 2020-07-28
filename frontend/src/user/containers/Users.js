import React, { useEffect, useState } from 'react';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import { User } from '../../shared/services/Api';
import UsersList from '../components/UsersList';

const Users = () => {
  const { addToast } = useToastContext();
  const [loadedUsers, setLoadedUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const res = await User.getAllUsers();
        console.log(res);
        setLoadedUsers(res.data.users);
      } catch (e) {
        console.log(e);
        addToast({
          messageType: 'danger',
          content: e.response?.data || 'Something went wrong',
        });
      }

      setIsLoading(false);
    };

    sendRequest();
  }, []);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  return loadedUsers && <UsersList items={loadedUsers} />;
};

export default Users;

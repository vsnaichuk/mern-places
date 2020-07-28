import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
  return useContext(AuthContext);
};

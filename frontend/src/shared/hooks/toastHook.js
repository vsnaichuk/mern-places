import { useContext } from 'react';
import { ToastContext } from '../context/toastContext';

export const useToastContext = () => {
  return useContext(ToastContext);
};

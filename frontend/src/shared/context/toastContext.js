import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import { v4 as uuid } from 'uuid';
import Toast from '../components/UIElements/Toast';

export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: uuid(),
          messageType: action.messageType,
          content: action.content,
        },
      ];

    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toastsState, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback(({ messageType, content }) => {
    dispatch({ type: 'ADD', messageType, content });
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  return (
    <ToastContext.Provider
      value={{ toastsState, addToast, removeToast }}
    >
      {children}

      <Toast {...{ toastsState, removeToast }} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext);
};

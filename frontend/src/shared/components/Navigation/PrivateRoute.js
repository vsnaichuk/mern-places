import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../../routes';
import { useAuthContext } from '../../hooks/authHook';

const PrivateRoute = ({ children, ...otherProps }) => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Route
      {...otherProps}
      render={() =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={
              otherProps.redirectTo
                ? otherProps.redirectTo
                : routes.AUTH
            }
          />
        )
      }
    />
  );
};

export default PrivateRoute;

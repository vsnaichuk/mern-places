import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from '../../../routes';
import { AuthContext } from '../../context/authContext';

const PrivateRoute = ({ children, ...otherProps }) => {
  const { isLoggedIn } = useContext(AuthContext);

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

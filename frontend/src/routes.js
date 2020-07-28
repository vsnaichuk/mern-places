import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NewPlace from './places/containers/NewPlace';
import UpdatePlace from './places/containers/UpdatePlace';
import UserPlaces from './places/containers/UserPlaces';
import PrivateRoute from './shared/components/Navigation/PrivateRoute';
import { useAuthContext } from './shared/hooks/authHook';
import Auth from './user/containers/Auth';
import Users from './user/containers/Users';

export const routes = {
  HOME: '/',
  USER_PLACES: '/:userId/places',
  NEW_PLACE: '/places/new',
  EDIT_PLACE: '/places/:placeId',
  AUTH: '/auth',
};

export const BaseRoutes = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <Switch>
      <Route path={routes.HOME} exact>
        <Users />
      </Route>

      <Route path={routes.USER_PLACES} exact>
        <UserPlaces />
      </Route>

      <PrivateRoute path={routes.NEW_PLACE}>
        <NewPlace />
      </PrivateRoute>

      <PrivateRoute path={routes.EDIT_PLACE}>
        <UpdatePlace />
      </PrivateRoute>

      {!isLoggedIn && (
        <Route path={routes.AUTH}>
          <Auth />
        </Route>
      )}

      <Redirect to={routes.HOME} />
    </Switch>
  );
};

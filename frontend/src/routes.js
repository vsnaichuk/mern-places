import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './shared/components/Navigation/PrivateRoute';
import { useAuthContext } from './shared/hooks/authHook';

const Users = React.lazy(() => import('./user/scenes/Users'));
const UserPlaces = React.lazy(() =>
  import('./places/scenes/UserPlaces'),
);
const NewPlace = React.lazy(() => import('./places/scenes/NewPlace'));
const UpdatePlace = React.lazy(() =>
  import('./places/scenes/UpdatePlace'),
);
const Auth = React.lazy(() => import('./user/scenes/Auth'));

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

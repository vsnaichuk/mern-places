import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import NewPlace from './places/containers/NewPlace';
import UpdatePlace from './places/containers/UpdatePlace';
import UserPlaces from './places/containers/UserPlaces';
import { routes } from './routes';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/containers/Auth';

import Users from './user/containers/Users';

const App = (props) => {
  return (
    <Router>
      <MainNavigation />

      <main>
        <Switch>
          <Route path={routes.HOME} exact>
            <Users />
          </Route>

          <Route path={routes.USER_PLACES} exact>
            <UserPlaces />
          </Route>

          <Route path={routes.NEW_PLACE}>
            <NewPlace />
          </Route>

          <Route path={routes.EDIT_PLACE}>
            <UpdatePlace />
          </Route>

          <Route path={routes.AUTH}>
            <Auth />
          </Route>

          <Redirect to={routes.HOME} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

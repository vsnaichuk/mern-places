import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { routes } from './routes';

import Users from './user/containers/Users';
import NewPlace from './places/containers/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/containers/UserPlaces';

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

          <Redirect to={routes.HOME} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

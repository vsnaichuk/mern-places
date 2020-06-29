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

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path={routes.HOME} exact>
          <Users />
        </Route>

        <Route path={routes.NEW_PLACE}>
          <NewPlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

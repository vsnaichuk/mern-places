import React, { useCallback, useState } from 'react';
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
import { AuthContext } from './shared/context/authContext';
import Auth from './user/containers/Auth';

import Users from './user/containers/Users';

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
    </AuthContext.Provider>
  );
};

export default App;

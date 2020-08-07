import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { BaseRoutes } from './routes';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthProvider } from './shared/context/authContext';
import { ToastProvider } from './shared/context/toastContext';

const queryConfig = {
  queries: {
    retry: false,
    // retryDelay: 2000
  },
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <MainNavigation />

            <main>
              <BaseRoutes />
            </main>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ReactQueryConfigProvider>
  );
};

export default App;

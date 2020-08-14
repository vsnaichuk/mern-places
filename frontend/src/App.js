import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { BaseRoutes } from './routes';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Spinner from './shared/components/UIElements/Spinner';
import { AuthProvider } from './shared/context/authContext';
import { ToastProvider } from './shared/context/toastContext';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <MainNavigation />

          <main>
            <Suspense fallback={<Spinner center />}>
              <BaseRoutes />
            </Suspense>
          </main>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;

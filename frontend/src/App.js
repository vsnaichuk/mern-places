import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BaseRoutes } from './routes';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthProvider } from './shared/context/authContext';
import { ToastProvider } from './shared/context/toastContext';

const App = () => {
  return (
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
  );
};

export default App;

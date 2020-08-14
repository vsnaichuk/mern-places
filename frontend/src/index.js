import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryConfigProvider } from 'react-query';
import App from './App';
// import { ReactQueryDevtools } from 'react-query-devtools';
import './index.scss';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const queryConfig = {
  queries: {
    retry: false,
    // retryDelay: 2000
  },
};

ReactDOM.render(
  <ReactQueryConfigProvider config={queryConfig}>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    <App />
  </ReactQueryConfigProvider>,
  document.getElementById('root'),
);

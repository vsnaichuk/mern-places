import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryConfigProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query-devtools';
import App from './App';

import './index.scss';

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

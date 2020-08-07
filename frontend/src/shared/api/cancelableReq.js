import { CancelToken } from 'axios';

export const cancelableReq = (asyncFn) => (...args) => {
  const source = CancelToken.source();
  const config = {
    cancelToken: source.token,
  };

  const promise = asyncFn(...args, config);

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

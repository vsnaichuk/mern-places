import axios, { CancelToken, isCancel } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useToastContext } from './toastHook';

export const useHttpClient = () => {
  const { addToast } = useToastContext();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const source = CancelToken.source();

  const sendRequest = useCallback(
    async (url, method = 'GET', data = null, opts) => {
      setIsLoading(true);

      try {
        const res = await axios({
          url,
          method,
          data,
          ...opts,
          cancelToken: source.token,
        });

        setData(res.data);
        setIsLoading(false);
      } catch (e) {
        if (isCancel(e)) {
          console.log(`Call for ${url} was cancelled`);
        } else {
          setError(e);
          setIsLoading(false);

          throw e;
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (error) {
      addToast({
        messageType: 'danger',
        content: error.response?.data || 'Something went wrong',
      });
    }

    return () => {
      setError(() => null);
    };
  }, [error, addToast]);

  useEffect(() => {
    return () => {
      source.cancel();
    };
  }, []);

  return [sendRequest, data, isLoading, error];
};

import axios from 'axios';
import { useMutation } from 'react-query';
import { cancelableReq } from '../cancelableReq';
import { apiUrl } from '../urls';

const authReq = cancelableReq(async ({ login, body }, config) => {
  const { data } = await axios.post(
    login ? apiUrl.LOGIN : apiUrl.SIGN_UP,
    body,
    config,
  );

  return data;
});

export const useUserAuth = () => {
  const [mutate, { data, error, isSuccess, isLoading }] = useMutation(
    authReq,
  );
  let errMessage = error && error.response?.data;

  return [mutate, data, isLoading, isSuccess, error, errMessage];
};

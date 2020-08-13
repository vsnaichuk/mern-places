import axios from 'axios';
import { useQuery } from 'react-query';
import { cancelableReq } from '../cancelableReq';
import { apiUrl } from '../urls';

const getUsers = cancelableReq(async (_, config) => {
  const { data } = await axios.get(apiUrl.USERS, config);

  return data;
});

export const useUsers = () => {
  const { isLoading, data, error } = useQuery('usersList', getUsers);
  let errMessage = error?.response?.data;

  return [data, isLoading, error, errMessage];
};

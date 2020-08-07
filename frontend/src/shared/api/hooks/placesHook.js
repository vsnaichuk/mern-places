import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { cancelableReq } from '../cancelableReq';
import { apiUrl } from '../urls';

const getPlacesById = cancelableReq(async (_, id, config) => {
  const { data } = await axios.get(
    `${apiUrl.USER_PLACES}/${id}`,
    config,
  );

  return data;
});

const getPlaceById = cancelableReq(async (_, id, config) => {
  const { data } = await axios.get(`${apiUrl.PLACES}/${id}`, config);

  return data;
});

const deletePlaceReq = cancelableReq(async (id, config) => {
  const { data } = await axios.delete(
    `${apiUrl.PLACES}/${id}`,
    config,
  );

  return data;
});

const createPlaceReq = cancelableReq(async (body, config) => {
  const { data } = await axios.post(apiUrl.PLACES, body, config);

  return data;
});

const updatePlaceReq = cancelableReq(async ({ id, body }, config) => {
  const { data } = await axios.patch(
    `${apiUrl.PLACES}/${id}`,
    body,
    config,
  );

  return data;
});

export const usePlacesById = (id) => {
  const { isLoading, data, error } = useQuery(
    ['userPlacesList', id],
    getPlacesById,
  );
  const errMessage = error && error.response?.data;

  return [data, isLoading, error, errMessage];
};

export const usePlaceById = (id) => {
  const { isLoading, data, error } = useQuery(
    ['userPlace', id],
    getPlaceById,
  );
  const errMessage = error && error.response?.data;
  const errStatus = error && error?.response.status;

  return [data, isLoading, error, errStatus, errMessage];
};

export const useDeletePlace = () => {
  const [mutate, { data, error, isSuccess, isLoading }] = useMutation(
    deletePlaceReq,
  );
  let errMessage = error && error.response?.data;

  return [mutate, data, isLoading, isSuccess, error, errMessage];
};

export const useCreatePlace = () => {
  const [mutate, { data, error, isSuccess, isLoading }] = useMutation(
    createPlaceReq,
  );
  let errMessage = error && error.response?.data;

  return [mutate, data, isLoading, isSuccess, error, errMessage];
};

export const useUpdatePlace = () => {
  const [mutate, { data, error, isLoading }] = useMutation(
    updatePlaceReq,
  );
  let errMessage = error && error.response?.data;

  return [mutate, data, isLoading, error, errMessage];
};

import axios from 'axios';
import { useQuery, useMutation, queryCache } from 'react-query';
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

const createPlaceReq = cancelableReq(async (body, config) => {
  const { data } = await axios.post(apiUrl.PLACES, body, config);

  return data;
});

const deletePlaceReq = cancelableReq(async (id, config) => {
  const { data } = await axios.delete(
    `${apiUrl.PLACES}/${id}`,
    config,
  );

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
    ['userPlaces', id],
    getPlacesById,
  );
  let errMessage = error?.response?.data;

  return [data, isLoading, errMessage];
};

export const usePlaceById = (id) => {
  const { isLoading, data, error } = useQuery(
    ['userPlace', id],
    getPlaceById,
  );
  let errStatus = error?.response?.status;

  return [data, isLoading, errStatus];
};

export const useCreatePlace = () => {
  const [mutate, { data, error, isSuccess, isLoading }] = useMutation(
    createPlaceReq,
  );
  let errMessage = error?.response?.data;

  return [mutate, data, isLoading, isSuccess, error, errMessage];
};

export const useDeletePlace = (userId) => {
  const [mutate, { data, error, isSuccess, isLoading }] = useMutation(
    deletePlaceReq,
    {
      onMutate: (placeId) => {
        queryCache.cancelQueries(['userPlaces', userId]);
        queryCache.setQueryData(['userPlaces', userId], (prev) => {
          return prev.places.filter((p) => p.id !== placeId);
        });
      },
      onSettled: () => {
        queryCache.invalidateQueries('userPlaces');
      },
    },
  );
  let errMessage = error?.response?.data;

  return [mutate, data, isLoading, isSuccess, error, errMessage];
};

export const useUpdatePlace = () => {
  const [mutate, { data, isLoading, isSuccess }] = useMutation(
    updatePlaceReq,
    {
      onSuccess: () => {
        queryCache.invalidateQueries('userPlace');
      },
    },
  );

  return [mutate, data, isLoading, isSuccess];
};

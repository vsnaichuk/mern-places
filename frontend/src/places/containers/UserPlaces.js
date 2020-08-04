import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../shared/api';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useHttpClient } from '../../shared/hooks/httpHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import PlacesList from '../components/PlacesList';

const UserPlaces = () => {
  const { addToast } = useToastContext();
  const [places, setPlaces] = useState(null);
  const { userId: id } = useParams();
  const [sendRequest, data, isLoading, error] = useHttpClient();

  useEffect(() => {
    const fetchPlaces = () => {
      sendRequest(`${apiUrl.PLACES}/${id}`);
    };
    fetchPlaces();
  }, [sendRequest]);

  useEffect(() => {
    if (data && !error) {
      setPlaces(data.places);
    }
  }, [data, error, addToast]);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  if (!places) {
    return null;
  }

  const deletePlaceHandler = (placeId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== placeId),
    );
  };

  return (
    <PlacesList items={places} onDeletePlace={deletePlaceHandler} />
  );
};

export default UserPlaces;

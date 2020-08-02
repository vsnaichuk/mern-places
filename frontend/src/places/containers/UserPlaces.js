import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../../shared/api';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import PlacesList from '../components/PlacesList';

const UserPlaces = () => {
  const { addToast } = useToastContext();
  const [places, setPlaces] = useState(null);
  const { userId: id } = useParams();
  const [{ data, loading, error }] = useAxios(
    apiConfig.getPlacesById(id),
  );

  useEffect(() => {
    if (data?.places) {
      setPlaces(data.places);
    }
    if (error) {
      addToast({
        messageType: 'danger',
        content: error.response?.data || 'Something went wrong',
      });
    }
  }, [data, error, addToast]);

  if (loading) {
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

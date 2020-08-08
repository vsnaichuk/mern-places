import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlacesById } from '../../shared/api/hooks/placesHook';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import PlacesList from '../components/PlacesList';

const UserPlaces = () => {
  const [places, setPlaces] = useState([]);
  const { addToast } = useToastContext();
  const { userId } = useParams();
  const [data, isLoading, error, errMessage] = usePlacesById(userId);

  useEffect(() => {
    if (data && !error) {
      setPlaces(data.places);
    }
    if (error) {
      addToast('danger', errMessage || 'Something went wrong');
    }
  }, [data, error]);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  const deletePlaceHandler = async (placeId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== placeId),
    );
  };

  return (
    <PlacesList items={places} onDeletePlace={deletePlaceHandler} />
  );
};

export default UserPlaces;

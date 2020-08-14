import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlacesById } from '../../shared/api/hooks/placesHook';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import PlacesList from '../components/PlacesList';

const UserPlaces = () => {
  const [places, setPlaces] = useState();
  const { userId } = useParams();
  const { addToast } = useToastContext();
  const [data, isLoading, errMessage] = usePlacesById(userId);

  useEffect(() => {
    if (data && data.places) {
      setPlaces(data.places);
    }
    if (errMessage) {
      addToast('danger', errMessage);
    }
  }, [data, errMessage]);

  if (isLoading) {
    return <Spinner center />;
  }

  const deletePlaceHandler = (placeId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== placeId),
    );
  };

  return (
    <>
      {places && (
        <PlacesList
          items={places}
          onDeletePlace={deletePlaceHandler}
        />
      )}
    </>
  );
};

export default UserPlaces;

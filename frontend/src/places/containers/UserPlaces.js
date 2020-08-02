import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiConfig } from '../../shared/api';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useToastContext } from '../../shared/hooks/toastHook';
import PlacesList from '../components/PlacesList';

const UserPlaces = () => {
  const { addToast } = useToastContext();
  const { userId: id } = useParams();
  const [{ data, loading, error }] = useAxios(
    apiConfig.getPlacesById(id),
  );

  useEffect(() => {
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

  if (!data?.places) {
    return null;
  }

  return <PlacesList items={data.places} />;
};

export default UserPlaces;

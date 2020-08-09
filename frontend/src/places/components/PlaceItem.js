import React, { useEffect } from 'react';
import { generatePath } from 'react-router-dom';
import { routes } from '../../routes';
import { useDeletePlace } from '../../shared/api/hooks/placesHook';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import Spinner from '../../shared/components/UIElements/Spinner';
import { useAuthContext } from '../../shared/hooks/authHook';
import { useModal } from '../../shared/hooks/modalHook';
import { useToastContext } from '../../shared/hooks/toastHook';
import s from './PlaceItem.module.scss';

const PlaceItem = ({
  id,
  title,
  descr,
  image,
  address,
  coordinates,
  creatorId,
  onDelete,
}) => {
  const [showMap, toggleMap] = useModal(false);
  const [showDeleteWarning, toggleDeleteWarning] = useModal(false);
  const { userId } = useAuthContext();
  const { addToast } = useToastContext();
  const [
    sendDeletePlace,
    data,
    isLoading,
    isSuccess,
    error,
    errMessage,
  ] = useDeletePlace();

  useEffect(() => {
    if (isSuccess) {
      onDelete(id);
      addToast('success', data.message);
    }
    if (error) {
      addToast('danger', errMessage || 'Something went wrong');
    }
  }, [isSuccess, error]);

  const confirmDeletePlace = async () => {
    toggleDeleteWarning();
    await sendDeletePlace(id);
  };

  return (
    <>
      {isLoading && <Spinner asOverlay />}

      <Modal
        show={showMap}
        onCancel={toggleMap}
        contentClass={s.placeModalContent}
        footerClass={s.placeModalActions}
        header={address}
        footer={<Button onClick={toggleMap}>CLOSE</Button>}
      >
        <div className={s.mapContainer}>
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDeleteWarning}
        onCancel={toggleDeleteWarning}
        contentClass={s.placeModalContent}
        footerClass={s.placeModalActions}
        header="Are you sure?"
        footer={
          <>
            <Button onClick={confirmDeletePlace} danger>
              DELETE
            </Button>
            <Button onClick={toggleDeleteWarning}>CANCEL</Button>
          </>
        }
      >
        <p className={s.deletePlaceTitle}>
          Do you really want to proceed and delete this place? <br />
          This action cannot be undone.
        </p>
      </Modal>

      <li className={s.placeItem}>
        <Card className={s.placeContent}>
          <div className={s.placeImage}>
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>

          <div className={s.placeInfo}>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{descr}</p>
          </div>

          <div className={s.placeActions}>
            <Button onClick={toggleMap} inverse>
              VIEW ON MAP
            </Button>

            {creatorId === userId && (
              <>
                <Button
                  to={generatePath(routes.EDIT_PLACE, {
                    placeId: id,
                  })}
                >
                  EDIT
                </Button>

                <Button onClick={toggleDeleteWarning} danger>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

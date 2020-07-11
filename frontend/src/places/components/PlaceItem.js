import React from 'react';
import { generatePath } from 'react-router-dom';
import { routes } from '../../routes';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { useModal } from '../../shared/hooks/useModal';
import s from './PlaceItem.module.scss';

const PlaceItem = ({
  id,
  title,
  descr,
  image,
  address,
  coordinates,
  creatorId,
}) => {
  const [showMap, toggleMap] = useModal(false);
  const [showDeleteWarning, toggleDeleteWarning] = useModal(false);

  const confirmDeletePlace = () => {
    toggleDeleteWarning();
    console.log('Deleting...'); // TODO: send delete to backend
  };

  return (
    <>
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
            <img src={image} alt={title} />
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

            <Button
              to={generatePath(routes.EDIT_PLACE, { placeId: id })}
            >
              EDIT
            </Button>

            <Button onClick={toggleDeleteWarning} danger>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

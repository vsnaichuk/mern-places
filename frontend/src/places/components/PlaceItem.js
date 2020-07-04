import React from 'react';
import s from './PlaceItem.module.scss';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { generatePath } from 'react-router-dom';
import { routes } from '../../routes';

const PlaceItem = ({
  id,
  title,
  descr,
  image,
  address,
  location,
  creatorId,
}) => {
  return (
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
          <Button inverse>VIEW ON MAP</Button>
          <Button
            to={generatePath(routes.EDIT_PLACE, { placeId: id })}
          >
            EDIT
          </Button>
          <Button danger>DELETE</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;

import React from 'react';
import s from './PlaceItem.module.scss';
import Card from '../../shared/components/UIElements/Card';

const PlaceItem = ({
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
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;

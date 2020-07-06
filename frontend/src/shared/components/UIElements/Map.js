import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import s from './Map.module.scss';

const Map = ({ className, style, center, zoom }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={cx(s.map, className)} style={style}>
      Map
    </div>
  );
};

export default Map;

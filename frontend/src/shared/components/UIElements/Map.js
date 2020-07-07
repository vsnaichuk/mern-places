import cx from 'classnames';
import React, { useEffect, useRef } from 'react';
import s from './Map.module.scss';

const Map = ({ className, style, center, zoom }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
      styles: MAP_STYLES,
    });

    new window.google.maps.Marker({
      position: center,
      map: map,
      icon: '/icons/marker.png',
    });
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={cx(s.map, className)} style={style}>
      Map
    </div>
  );
};

export const MAP_STYLES = [
  {
    featureType: 'water',
    stylers: [
      {
        color: '#19a0d8',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        weight: 6,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#e85113',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#efe9e4',
      },
      {
        lightness: -40,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#efe9e4',
      },
      {
        lightness: -20,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: -100,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.icon',
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        lightness: 20,
      },
      {
        color: '#efe9e4',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: -100,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        hue: '#11ff00',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        lightness: 100,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        hue: '#4cff00',
      },
      {
        saturation: 58,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#f0e4d3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#efe9e4',
      },
      {
        lightness: -25,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#efe9e4',
      },
      {
        lightness: -10,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
];

export default Map;

import React from 'react';
// import s from './Logo.module.scss';

const Logo = (props) => {
  return (
    <svg viewBox="0 0 128 128" {...props}>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1={64}
          y1={9.951}
          x2={64}
          y2={105.94}
          id="prefix__a"
          spreadMethod="reflect"
        >
          <stop offset={0} stopColor="#4242ed" />
          <stop offset={1} stopColor="#4311b7" />
        </linearGradient>
      </defs>
      <title />
      <g data-name="15 Place Optimization">
        <ellipse
          cx={64}
          cy={106.06}
          rx={47.51}
          ry={12}
          paintOrder="fill"
          fill="#5545ea"
        />
        <path
          d="M64 105.94L82.74 95c-4.56-.5-9.5-.81-14.67-.92z"
          fill="#242848"
          filter="none"
        />
        <path
          d="M35.88 77.82a39.76 39.76 0 1156.24 0L64 105.94z"
          filter="none"
          fill="url(#prefix__a)"
        />
        <circle
          cx={64}
          cy={49.7}
          r={14.91}
          transform="rotate(-45 63.997 49.702)"
          fillOpacity={0.3}
          fill="#fff"
        />
        <path
          d="M57.46 60.25A14.89 14.89 0 0166 34.94a14.9 14.9 0 100 29.52 14.83 14.83 0 01-8.54-4.21z"
          fillOpacity={0.26}
          fill="#7a33ff"
        />
      </g>
    </svg>
  );
};

export default Logo;

import cx from 'classnames';
import React from 'react';
import s from './Spinner.module.scss';

const Spinner = ({ asOverlay, ...props }) => {
  return (
    <div className={cx({ [s.overlay]: asOverlay })}>
      <div className={s.spinnerBox}>
        <div className={s.spinnerCircleBack} />

        <div className={s.spinnerBall} />
      </div>
    </div>
  );
};

export default Spinner;

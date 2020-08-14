import cx from 'classnames';
import React from 'react';
import s from './Spinner.module.scss';

const SpinnerWrap = ({ asOverlay, center, children }) => {
  return (
    <div
      className={cx(
        { [s.overlay]: asOverlay },
        { [s.center]: center },
      )}
    >
      {children}
    </div>
  );
};

const Spinner = (props) => {
  const { asOverlay, center } = props;

  const el = (
    <div className={s.spinnerBox}>
      <div className={s.spinnerCircleBack} />

      <div className={s.spinnerBall} />
    </div>
  );

  if (asOverlay || center) {
    return <SpinnerWrap {...props}>{el}</SpinnerWrap>;
  }

  return el;
};

export default Spinner;

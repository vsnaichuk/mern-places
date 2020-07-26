import React from 'react';
import ReactDOM from 'react-dom';
import s from './Backdrop.module.scss';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={onClick} />,
    document.body,
  );
};

export default Backdrop;

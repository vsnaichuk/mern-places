import React from 'react';
import ReactDOM from 'react-dom';
import s from './Backdrop.module.scss';

const Backdrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className={s.backdrop} onClick={onClick} />,
    document.getElementById('backdrop-hook'),
  );
};

export default Backdrop;

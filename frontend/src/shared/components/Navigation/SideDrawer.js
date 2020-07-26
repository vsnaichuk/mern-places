import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../UIElements/Backdrop';
import s from './SideDrawer.module.scss';

const SideDrawer = ({ children, show, onClose }) => {
  const content = (
    <>
      {show && <Backdrop onClick={onClose} />}

      <CSSTransition
        in={show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className={s.sideDrawer} onClick={onClose}>
          {children}
        </aside>
      </CSSTransition>
    </>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default SideDrawer;

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import s from './SideDrawer.module.scss';
import Backdrop from '../UIElements/Backdrop';

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

  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook'),
  );
};

export default SideDrawer;

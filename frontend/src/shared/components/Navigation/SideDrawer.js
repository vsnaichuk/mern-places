import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import s from './SideDrawer.module.scss';

const SideDrawer = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={s.sideDrawer} onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook'),
  );
};

export default SideDrawer;

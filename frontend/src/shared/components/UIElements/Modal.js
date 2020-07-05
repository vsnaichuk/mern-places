import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import s from './Modal.module.scss';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const content = (
    <div className={cx(s.modal, className)} style={style}>
      <header className={cx(s.modalHeader, headerClass)}>
        <h2>{header}</h2>
      </header>

      <form
        onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}
      >
        <div className={cx(s.modalContent, contentClass)}>
          {children}
        </div>

        <footer className={cx(s.modalFooter, footerClass)}>
          {footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook'),
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;

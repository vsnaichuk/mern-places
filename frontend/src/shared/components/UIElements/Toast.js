import cx from 'classnames';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Button from '../FormElements/Button';
import s from './Toast.module.scss';

const Toast = ({ id, messageType, content, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <div className={cx(s.toastItem, s[messageType])}>
      <p className={s.toastContent}>{content}</p>

      <Button
        className={s.toastButton}
        onClick={() => {
          removeToast(id);
        }}
      />
    </div>
  );
};

const ToastList = ({ toastsState, ...props }) => {
  const content = (
    <div className={s.toastList}>
      <TransitionGroup>
        {toastsState.map((item) => (
          <CSSTransition
            key={item.id}
            timeout={200}
            classNames="toast"
            mountOnEnter
            unmountOnExit
          >
            <Toast key={item.id} {...item} {...props} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ToastList;

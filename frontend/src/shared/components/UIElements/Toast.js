import cx from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import s from './Toast.module.scss';

const Toast = ({ id, messageType, content, removeToast }) => {
  return (
    <div
      className={cx(
        s.toastItem,
        { [s.success]: messageType === 'success' },
        { [s.danger]: messageType === 'danger' },
        { [s.info]: messageType === 'info' },
        { [s.warning]: messageType === 'warning' },
      )}
    >
      <span
        role="img"
        aria-label="close toast"
        className="toast-close"
        onClick={() => removeToast(id)}
      >
        &times;
      </span>

      <p>{content}</p>
    </div>
  );
};

const ToastList = ({ toastsState, ...props }) => {
  const content = (
    <div className={s.toastList}>
      {toastsState.map((item) => (
        <Toast key={item.id} {...item} {...props} />
      ))}
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ToastList;

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = props => {
  return (
    <div
      data-testid="backdrop"
      className={styles.backdrop}
      onClick={props.onClose}
    ></div>
  );
};

const ModalOverlay = props => {
  return (
    <div data-testid="modal" className={styles.modal} onClick={props.onClick}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = props => {
  const portalElement = document.getElementById('overlays');
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </React.Fragment>
  );
};

export default Modal;

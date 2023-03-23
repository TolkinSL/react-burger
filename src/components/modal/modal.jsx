import React from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector("#modal-root");

export default function Modal({children, closeModal}) {

  React.useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return createPortal(
      <>
        <div className={styles.modal}>
          <button className={styles.button} type="button" onClick={closeModal}><CloseIcon type="primary"/></button>
          {children}
        </div>
        <ModalOverlay closeModal={closeModal}/>
      </>,
      modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
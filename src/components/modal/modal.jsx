import React from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalRoot = document.querySelector("#modal-root");

export default function Modal({children, closeModal}) {

  React.useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        console.log('Press Esc');
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
        {/*<div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>*/}
        <div className={styles.modal}>
          <button className={styles.button} type="button" onClick={closeModal}><CloseIcon type="primary"/></button>
          {children}
        </div>
        <ModalOverlay closeModal={closeModal}/>
      </>,
      modalRoot
  );
}
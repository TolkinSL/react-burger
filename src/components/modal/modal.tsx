import React from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import {TModal} from "../../utils/types";

const modalRoot = document.querySelector("#modal-root") as Element;

function Modal({children, closeModal}: TModal) {

  React.useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
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

export default Modal;
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import Modal from "../modal/modal";

export default function ModalOverlay({closeModal}) {
  return (
      <div className={styles.overlay} onClick={closeModal}></div>
  );
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
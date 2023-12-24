import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import {TModal} from "../../utils/types";

function ModalOverlay({closeModal}: TModal) {
  return (
      <div className={styles.overlay} onClick={closeModal}></div>
  );
}

export default ModalOverlay;
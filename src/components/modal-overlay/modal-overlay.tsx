import styles from './modal-overlay.module.css';
import {TModal} from "../../utils/types";

function ModalOverlay({closeModal}: TModal) {
  return (
      <div className={styles.overlay} onClick={closeModal}></div>
  );
}

export default ModalOverlay;
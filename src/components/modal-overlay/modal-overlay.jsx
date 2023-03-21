import styles from './modal-overlay.module.css';

export default function ModalOverlay({closeModal}) {
  return (
      <div className={styles.overlay} onClick={closeModal}></div>
  );
}
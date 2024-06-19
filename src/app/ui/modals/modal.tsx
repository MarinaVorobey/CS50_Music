import styles from "./modal.module.css";

export default function Modal() {
  return (
    <div className={styles.modal}>
      <div className={styles.footer}>
        <div className={styles.close__btn}>Cancel</div>
      </div>
    </div>
  );
}

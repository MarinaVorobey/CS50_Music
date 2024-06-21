import styles from "./confirm.module.css";

interface IConfirmProps {
  title: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Confirm({
  title,
  confirmText,
  onClose,
  onConfirm,
}: IConfirmProps) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.submit__block}>
        <button onClick={onConfirm} className={styles.confirm__btn}>
          {confirmText}
        </button>
        <button onClick={onClose} className={styles.close__btn}>
          Cancel
        </button>
      </div>
    </>
  );
}

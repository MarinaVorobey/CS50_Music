import generalStyles from "../modal.module.css";

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
      <h2 className={`${generalStyles.title} ${generalStyles.bigger__margin}`}>
        {title}
      </h2>
      <div className={generalStyles.submit__block}>
        <button onClick={onConfirm} className={generalStyles.submit__btn}>
          {confirmText}
        </button>
        <button
          aria-label="Close modal"
          onClick={onClose}
          className={generalStyles.close__btn}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

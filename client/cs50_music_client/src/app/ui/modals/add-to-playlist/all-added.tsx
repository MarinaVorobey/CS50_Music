import styles from "./add-to-playlist.module.css";
import generalStyles from "../modal.module.css";

export default function AllAdded({ onClose }: { onClose: () => void }) {
  return (
    <>
      <p className={styles.no__data__message}>
        All of your playlists contatin this track
      </p>
      <button
        aria-label="Close modal"
        type="button"
        onClick={onClose}
        className={generalStyles.submit__btn}
      >
        OK
      </button>
    </>
  );
}

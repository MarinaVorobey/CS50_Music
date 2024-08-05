import styles from "./add-to-playlist.module.css";
import generalStyles from "../modal.module.css";

export default function AllAdded({ onClose }: { onClose: () => void }) {
  return (
    <>
      <p className={styles.no__data__message}>
        There are no playlists the track can be added to.
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

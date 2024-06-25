import generalStyles from "../modal.module.css";
import styles from "./create-playlist.module.css";

export default function CreatePlaylist({ onClose }: { onClose: () => void }) {
  return (
    <form method="POST" className={styles.form}>
      <h3 className={generalStyles.title}>Create playlist</h3>
      <label className={generalStyles.label} htmlFor="playlist-name">
        Name:
      </label>
      <input id="playlist-name" className={generalStyles.input} />
      <p className={generalStyles.label}>Cover:</p>
      <ul className={styles.cover__choise}></ul>
      <div className={generalStyles.submit__block}>
        <button className={generalStyles.submit__btn} type="submit">
          Log in
        </button>
        <button
          onClick={onClose}
          type="button"
          className={generalStyles.close__btn}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

import generalStyles from "../modal.module.css";
import styles from "./create-playlist.module.css";
import Image from "next/image";

export default function CreatePlaylist({ onClose }: { onClose: () => void }) {
  const coverNums = Array.from(Array(8).keys());

  return (
    <form method="POST" className={styles.form}>
      <h3 className={generalStyles.title}>Create playlist</h3>
      <label className={generalStyles.label} htmlFor="playlist-name">
        Name:
      </label>
      <input required id="playlist-name" className={generalStyles.input} />
      <p className={generalStyles.label}>Cover:</p>
      <ul className={styles.cover__choice}>
        {coverNums.map((i) => (
          <li key={i + 1} className={styles.choice__item}>
            <label className={styles.choice__label}>
              <input
                type="radio"
                className={`${styles.choice__input} visually-hidden`}
                value={i + 1}
                name="cover-number"
              />
              <Image
                priority={true}
                width={60}
                height={60}
                className={styles.chioce__img}
                src={`/playlist_covers/playlists%20(${i + 1}).jpg`}
                alt={`Playlist cover number ${i + 1}`}
              />
            </label>
          </li>
        ))}
      </ul>
      <div className={generalStyles.submit__block}>
        <button className={generalStyles.submit__btn} type="submit">
          Create
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

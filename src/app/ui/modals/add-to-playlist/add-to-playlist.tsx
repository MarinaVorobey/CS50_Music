import Image from "next/image";
import styles from "./add-to-playlist.module.css";

export default function AddToPlaylist({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.title}>Add to playlist</div>
      <div className={styles.playlist__content}>
        <div className={styles.playlist}>
          <Image
            width={60}
            height={60}
            src="/track_covers/cover1.jpg"
            alt="Gangsta's Paradise"
            className={styles.playlist__image}
          />
          <div className={styles.playlist__title}>Playlist #1</div>
          <div className={styles.playlist__info}>No tracks</div>
        </div>
        <div className={styles.playlist}>
          <Image
            width={60}
            height={60}
            src="/track_covers/cover1.jpg"
            alt="Gangsta's Paradise"
            className={styles.playlist__image}
          />
          <div className={styles.playlist__title}>Playlist #2</div>
          <div className={styles.playlist__info}>No tracks</div>
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={onClose} className={styles.close__btn}>
          Cancel
        </button>
      </div>
    </>
  );
}

import Image from "next/image";
import styles from "./add-to-playlist.module.css";
import { IPlaylist } from "@/app/lib/definitions";

export default function AddToPlaylist({ onClose }: { onClose: () => void }) {
  const playlists: IPlaylist[] = [
    {
      id: 1,
      name: "For studying English",
      coverNumber: 1,
      createdAt: new Date(),
      tracks: [],
    },
    {
      id: 2,
      name: "Playlist#1",
      coverNumber: 2,
      createdAt: new Date(),
      tracks: [],
    },
  ];

  return (
    <>
      <div className={styles.title}>Add to playlist</div>
      <form action="POST" className={styles.form}>
        <ul className={styles.playlist__content}>
          {playlists.map((p) => (
            <li key={p.id} className={styles.playlist}>
              <input
                id={`${p.id}`}
                className={`${styles.checkbox} visually-hidden`}
                type="checkbox"
              />
              <label htmlFor={`${p.id}`} className={styles.label}>
                <Image
                  width={60}
                  height={60}
                  src={`/track_covers/cover${p.coverNumber}.jpg`}
                  alt={`${p.name} track cover`}
                  className={styles.playlist__image}
                />
                <div className={styles.playlist__title}>{p.name}</div>
                <div className={styles.playlist__info}>
                  {p.tracks.length > 0 ? `${p.tracks} tracks` : "No tracks"}
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <button
            type="submit"
            onClick={onClose}
            className={styles.submit__btn}
          >
            Done
          </button>
          <button type="button" onClick={onClose} className={styles.close__btn}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

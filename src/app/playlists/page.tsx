import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { IPlaylist } from "../lib/definitions";

export default function Page() {
  const playlists: IPlaylist[] = [
    {
      id: 1,
      name: "Favorite songs",
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
    <section>
      <h2 className={`${styles.h2} visually-hidden`}>Playlists</h2>
      <ul className={styles.list}>
        {playlists.map((p) => (
          <li key={p.id} className={styles.item}>
            <Image
              src={`/playlist_covers/playlists%20(${p.coverNumber}).jpg`}
              width={360}
              height={360}
              className={styles.img__desktop}
              alt={`${p.name} cover`}
            />
            <Image
              src={`/playlist_covers/playlists__1440%20(${p.coverNumber}).jpg`}
              width={240}
              height={240}
              className={styles.img__tablet}
              alt={`${p.name} cover`}
            />
            <Image
              src={`/playlist_covers/playlists__360%20(${p.coverNumber}).jpg`}
              width={99}
              height={99}
              className={styles.img__mobile}
              alt={`${p.name} cover`}
            />
            <div className={styles.content}>
              <h3 className={styles.h3}>
                <Link className={styles.h3__link} href={`/playlist/${p.id}`}>
                  {p.name}
                </Link>
              </h3>
              <span className={styles.count}>
                {p.tracks.length > 0
                  ? `${p.tracks.length} tracks`
                  : "No tracks"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

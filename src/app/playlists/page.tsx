import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <section>
      <h2 className={`${styles.h2} visually-hidden`}>Playlists</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Image
            src="/playlist_covers/playlists%20(1).jpg"
            width={360}
            height={360}
            className={styles.img__desktop}
            alt="Favorite songs"
          />
          <Image
            src="/playlist_covers/playlists__1440%20(1).jpg"
            width={240}
            height={240}
            className={styles.img__tablet}
            alt="Favorite songs"
          />
          <Image
            src="/playlist_covers/playlists__360%20(1).jpg"
            width={99}
            height={99}
            className={styles.img__mobile}
            alt="Favorite songs"
          />
          <div className={styles.content}>
            <h3 className={styles.h3}>
              <Link className={styles.h3__link} href="/">
                Favorite songs
              </Link>
            </h3>
            <span className={styles.count}>58 tracks</span>
          </div>
        </li>
        <li className={styles.item}>
          <Image
            src="/playlist_covers/playlists%20(1).jpg"
            width={360}
            height={360}
            className={styles.img__desktop}
            alt="Favorite songs"
          />
          <Image
            src="/playlist_covers/playlists__1440%20(1).jpg"
            width={240}
            height={240}
            className={styles.img__tablet}
            alt="Favorite songs"
          />
          <Image
            src="/playlist_covers/playlists__360%20(1).jpg"
            width={99}
            height={99}
            className={styles.img__mobile}
            alt="Favorite songs"
          />
          <div className={styles.content}>
            <h3 className={styles.h3}>
              <Link className={styles.h3__link} href="/">
                Favorite songs
              </Link>
            </h3>
            <span className={styles.count}>58 tracks</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

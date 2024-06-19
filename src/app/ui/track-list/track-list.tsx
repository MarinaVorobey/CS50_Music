import Icon from "../icon";
import { colors } from "../colors";
import styles from "./track-list.module.css";
import Track from "./track/track";
import { ITrack } from "@/app/lib/definitions";

export default function TrackList() {
  const tracksInfo: ITrack[] = [
    {
      id: 1,
      name: "In Bloom",
      path: "@/app/icon.png",
      image: "/track_covers/cover1.jpg",
      duration: 2000000,
      createdAt: new Date("December 1, 1995 03:24:00"),
      album: "Nirvana",
      artist: "Nirvana",
      liked: true,
      playlists: [],
    },
  ];

  return (
    <section className="tracks section" data-target="tracks">
      <h2 className={styles.title__h2}>Tracks</h2>
      <div className={styles.content}>
        <div className={`${styles.header} flex`}>
          <div className={styles.header__number}>№</div>
          <div className={styles.header__name}>NAME</div>
          <div className={styles.header__album}>ALBUM</div>
          <div className={styles.header__data}>
            <Icon type="calendar" defaultColor={colors.greyA4} />
          </div>
          <div className={styles.header__time}>
            <Icon type="clock" defaultColor={colors.greyA4} />
          </div>
        </div>
        <ul className={styles.list}>
          {tracksInfo.map((t) => (
            <li className={`${styles.item} flex`} key={t.id}>
              <Track trackData={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

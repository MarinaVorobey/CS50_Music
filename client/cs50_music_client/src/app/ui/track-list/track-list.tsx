import Icon from "../icon";
import { colors } from "../colors";
import styles from "./track-list.module.css";
import Track from "./track/track";
import { ITrack } from "@/app/lib/definitions";

type TTracklists = "all" | "favorite" | "playlist" | "artist";
interface ITrackListProps {
  type: TTracklists;
  id?: number;
}

export default function TrackList({ type, id }: ITrackListProps) {
  const defaultPlaylist = {
    name: "Playlist#1",
    tracks: [],
  };

  const defaultArtist = {
    name: "Artist",
    tracks: [],
  };

  const tracksInfo: ITrack[] = [
    {
      id: 1,
      name: "In Bloom",
      duration: 2000000,
      album: "Nirvana",
      artist: {
        id: 1,
        name: "Test",
        image: "Test",
      },
      liked: true,
    },
  ];

  return (
    <section className="tracks section">
      <h2 className={styles.title__h2}>
        {type === "playlist"
          ? defaultPlaylist.name
          : type === "all"
          ? "All tracks"
          : type === "artist"
          ? defaultArtist.name
          : "Favorite tracks"}
      </h2>
      {tracksInfo.length === 0 ? (
        <p className={styles.no__tracks}>No tracks here yet.</p>
      ) : (
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
      )}
    </section>
  );
}

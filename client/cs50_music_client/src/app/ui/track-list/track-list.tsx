import Icon from "../icon";
import { colors } from "../colors";
import styles from "./track-list.module.css";
import Track from "./track/track";
import { ITrack } from "@/app/lib/definitions";
import Image from "next/image";

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
      createdAt: new Date(),
      album: "Nirvana",
      artist: {
        id: 1,
        name: "Test",
        image: "/playlist_covers/default__add.jpg",
      },
      liked: true,
    },
  ];

  return (
    <section className="tracks section">
      <div className={styles.meta}>
        <Image
          width={70}
          height={70}
          className={styles.img}
          src="/playlist_covers/playlists%20(3).jpg"
          alt="Text"
        />
        <div className={styles.meta__text}>
          <h2 className={styles.title__h2}>
            {type === "playlist"
              ? defaultPlaylist.name
              : type === "all"
              ? "All tracks"
              : type === "artist"
              ? defaultArtist.name
              : "Favorite tracks"}
          </h2>
          <p className={styles.track__count}>
            {tracksInfo.length
              ? `${tracksInfo.length} track${tracksInfo.length > 1 ? "s" : ""}`
              : "No tracks."}
          </p>
        </div>
      </div>
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

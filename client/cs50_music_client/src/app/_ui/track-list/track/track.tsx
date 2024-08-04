"use client";

import Image from "next/image";
import { ITrack } from "@/app/_lib/definitions";
import styles from "./track.module.css";
import { formatDuration, formatTimePassed } from "@/app/_lib/utils";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { getUserToken } from "@/app/_lib/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LikeBtn from "../../network/like-btn";
import { changeTrack } from "@/app/_lib/player-control";
import TrackDropdown from "./track-dropdown";

interface ITrackProps {
  number: number;
  trackData: ITrack;
}

export default function Track({ number, trackData }: ITrackProps) {
  const { id, name, created_at, duration, license, album, artist, liked } =
    trackData;
  const pathname = usePathname();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const queryClient = useQueryClient();

  const playlist = useParams().id as string;
  const queueType = pathname.includes("playlist")
    ? "playlist"
    : pathname.includes("favorite")
    ? "favorite"
    : pathname.includes("artist")
    ? "artist"
    : "all";
  const queueId = pathname.includes("artist")
    ? `${artist.id}`
    : pathname.includes("playlist")
    ? playlist
    : null;
  const changeTrackAction = useMutation({
    mutationFn: () => changeTrack(`${id}`, queueType, queryClient, queueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <>
      <div className={styles.item__number}>{number}</div>
      <div className={styles.item__name}>
        <Image
          width={60}
          height={60}
          className={styles.img}
          src={`/artist_covers/${artist.image}`}
          alt={`Image of ${name}`}
        />
        <div className={styles.content}>
          <h3 className={styles.name}>
            <div
              onClick={() => changeTrackAction.mutate()}
              className={styles.name__link}
            >
              {name}
            </div>
          </h3>
          <div className={styles.artist__wrapper}>
            <Link href={`/artist/${artist.id}`} className={styles.artist}>
              {artist.name}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.item__album}>{album}</div>
      <div className={`${styles.item__data} flex`}>
        <span className={styles.data__text}>
          {formatTimePassed(created_at)}
        </span>
        <LikeBtn id={id} liked={liked} />
      </div>
      <time className={styles.item__time}>{formatDuration(duration)}</time>
      <div className={styles.item__drop}>
        <TrackDropdown
          created_at={created_at}
          license={license}
          artist={artist}
          userToken={userToken}
          id={`${id}`}
          playlist={playlist}
        />
      </div>
    </>
  );
}

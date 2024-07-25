"use client";

import Image from "next/image";
import Icon from "../../icon";
import { colors } from "../../colors";
import styles from "./player.module.css";
import { ITrack } from "@/app/lib/definitions";
import { fetchCurrentTrack } from "@/app/lib/data";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDuration } from "@/app/lib/utils";
import Link from "next/link";
import LikeBtn from "../../network/like-btn";
import PlayerSkeleton from "./player-skeleton";
import Skipback from "./controls/skipback";
import Skipnext from "./controls/skipnext";
import Shuffle from "./controls/shuffle";
import Play from "./controls/play";
import Repeat from "./controls/repeat";

export default function Player() {
  const { data, isError, isLoading }: UseQueryResult<ITrack, AxiosError> =
    useQuery({
      queryKey: ["curr_track"],
      queryFn: fetchCurrentTrack,
    });

  if (isLoading || isError || !data) {
    return <PlayerSkeleton />;
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.player} flex`}>
        <div className={`${styles.track__name} flex`}>
          <Image
            className={styles.track__img}
            src={`/artist_covers/${data.artist.image}`}
            width={60}
            height={60}
            alt={`${data.artist.name} - ${data.name}`}
          />
          <div className={styles.track__name__content}>
            <div className={`${styles.name__header} flex`}>
              <h3 className={styles.track__h3}>{data.name}</h3>
              <LikeBtn id={data?.id ?? 1} liked={data?.liked ?? false} />
            </div>
            <Link href={`/artist/${data.artist.id}`} className={styles.artist}>
              {data.artist.name}
            </Link>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.controls__header}>
            <Shuffle />
            <Skipback />
            <Play />
            <Skipnext />
            <Repeat />
          </div>

          <div className={styles.controls__footer}>
            <span className={styles.time__start}>0:26</span>
            <div className={styles.range__play} id="range-play"></div>
            <span className={styles.time__end}>
              {formatDuration(data.duration)}
            </span>
          </div>
        </div>
        <div className={styles.volume}>
          <Icon type="sound" defaultColor={colors.greyAA} />
          <div className={styles.volume__range} id="range-value"></div>
        </div>
      </div>
    </footer>
  );
}

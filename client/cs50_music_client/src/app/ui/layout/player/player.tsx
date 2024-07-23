"use client";

import Image from "next/image";
import Icon, { TIconNames } from "../../icon";
import { colors } from "../../colors";
import styles from "./player.module.css";
import { ITrack } from "@/app/lib/definitions";
import { fetchCurrentTrack } from "@/app/lib/data";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formatDuration } from "@/app/lib/utils";
import Link from "next/link";
import LikeBtn from "../../network/like-btn";

interface IControlButtonInfo {
  iconType: TIconNames;
  className: string;
  iconClassName: string;
}

export default function Player() {
  const controls: IControlButtonInfo[] = [
    {
      iconType: "shuffle",
      className: `${styles.controls__btn} ${styles.shuffle__btn}`,
      iconClassName: styles.shuffle__btn__icon,
    },
    {
      iconType: "play-prev",
      className: `${styles.controls__btn} ${styles.skipback__btn}`,
      iconClassName: styles.skipback__btn__icon,
    },
    {
      iconType: "play",
      className: styles.play__btn,
      iconClassName: styles.play__btn__icon,
    },
    {
      iconType: "play-next",
      className: `${styles.controls__btn} ${styles.skipnext__btn}`,
      iconClassName: styles.skipnext__btn__icon,
    },
    {
      iconType: "repeat",
      className: `${styles.controls__btn} ${styles.repeat__btn}`,
      iconClassName: styles.repeat__btn__icon,
    },
  ];

  const {
    data,
    error,
    isError,
    isLoading,
  }: UseQueryResult<ITrack, AxiosError> = useQuery({
    queryKey: ["curr_track"],
    queryFn: fetchCurrentTrack,
  });

  if (isLoading || isError || !data) {
    return "None";
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
            {controls.map((c) => (
              <button key={c.iconType} className={c.className}>
                <Icon
                  type={c.iconType}
                  className={c.iconClassName}
                  defaultColor={colors.greyAA}
                />
              </button>
            ))}
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

"use client";

import Icon from "../icon";
import { colors } from "../colors";
import styles from "./track-list.module.css";
import Track from "./track/track";
import Image from "next/image";
import { ITrack, TTracklists } from "@/app/lib/definitions";

interface ITrackListProps {
  type: TTracklists;
  title: string;
  tracks: ITrack[];
  image?: string;
}

export default function TrackList({
  type,
  title,
  tracks,
  image,
}: ITrackListProps) {
  return (
    <section key={type} className="tracks section">
      <div className={styles.meta}>
        {image && (
          <Image
            width={70}
            height={70}
            className={styles.img}
            src={`/${type}_covers/${image}`}
            alt="Text"
          />
        )}
        <div className={styles.meta__text}>
          <h2 className={styles.title__h2}>{title}</h2>
          {tracks ? (
            <p className={styles.track__count}>
              {tracks.length
                ? `${tracks.length} track${tracks.length > 1 ? "s" : ""}`
                : "No tracks"}
            </p>
          ) : null}
        </div>
      </div>
      {tracks.length === 0 ? (
        <p className={styles.no__tracks}>{`No tracks here. ${
          type === "playlist"
            ? 'To add track to playlist, search for it and press the "plus" button.'
            : ""
        }`}</p>
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
            {tracks &&
              tracks.map((t, i) => (
                <li className={`${styles.item} flex`} key={t.id}>
                  <Track number={i + 1} trackData={t} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import { colors } from "../../colors";
import Icon from "../../icon";
import { ITrack } from "@/app/lib/definitions";
import styles from "./track.module.css";
import { formatDuration, formatTimePassed } from "@/app/lib/utils";
import { useState } from "react";
import Modal from "../../modals/modal";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  getUserToken,
  removeFromPlaylist,
  setLastListened,
} from "@/app/lib/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LikeBtn from "../../network/like-btn";

export default function Track({
  number,
  trackData,
}: {
  number: number;
  trackData: ITrack;
}) {
  const { id, name, created_at, duration, album, artist, liked } = trackData;
  const pathname = usePathname();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const playlist = useParams().id as string;
  const removeTrackAction = useMutation({
    mutationFn: () => removeFromPlaylist(playlist, `${id}`),
    onSuccess: () => {
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
    },
  });

  const changeTrackAction = useMutation({
    mutationFn: () => setLastListened(`${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
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
          alt={name}
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
        <button
          disabled={!userToken.data}
          onClick={() => setModalOpen(true)}
          className={
            !pathname.includes("playlist")
              ? styles.btn__add
              : styles.btn__remove
          }
        >
          <Icon
            type={!pathname.includes("playlist") ? "plus" : "minus"}
            defaultColor={colors.greyC4}
          />
        </button>
      </div>

      {modalOpen ? (
        !pathname.includes("playlist") ? (
          <Modal
            data={{
              id: id,
            }}
            onClose={() => setModalOpen(false)}
            type="addToPlaylist"
          />
        ) : (
          <Modal
            onClose={() => setModalOpen(false)}
            type="confirm"
            data={{
              title: "Remove song from the playlist?",
              confirmText: "Remove",
              onConfirm: removeTrackAction.mutate,
            }}
          />
        )
      ) : null}
    </>
  );
}

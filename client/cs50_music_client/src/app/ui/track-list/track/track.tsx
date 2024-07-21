"use client";

import Image from "next/image";
import { colors } from "../../colors";
import Icon from "../../icon";
import { ITrack } from "@/app/lib/definitions";
import styles from "./track.module.css";
import { formatDuration, formatTimePassed } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import Modal from "../../modals/modal";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { getUserToken, likeTrack, removeFromPlaylist } from "@/app/lib/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Track({
  number,
  trackData,
}: {
  number: number;
  trackData: ITrack;
}) {
  const { id, name, created_at, duration, album, artist, liked } = trackData;
  const [modalOpen, setModalOpen] = useState(false);
  const [likedTrack, setLikedTrack] = useState(liked);

  const queryClient = useQueryClient();
  const pathname = usePathname();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });

  const likeAction = useMutation({
    mutationFn: () => likeTrack(`${id}`),
    onSuccess: () => {
      setLikedTrack((prev) => !prev);
      const currTrack: ITrack | undefined = queryClient.getQueryData([
        "curr_track",
      ]);
      if (currTrack && currTrack.id === id) {
        queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      }
    },
  });
  useEffect(() => {
    setLikedTrack(liked);
  }, [liked]);

  const playlist = useParams().id as string;
  const removeTrackAction = useMutation({
    mutationFn: () => removeFromPlaylist(playlist, `${id}`),
    onSuccess: () => {
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
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
            <a className={styles.name__link} href="#">
              {name}
            </a>
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
        <button
          onClick={() => likeAction.mutate()}
          disabled={!userToken.data}
          className={styles.like__btn}
        >
          <Icon
            type="heart"
            defaultColor={likedTrack ? colors.orange : colors.greyA4}
          />
        </button>
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

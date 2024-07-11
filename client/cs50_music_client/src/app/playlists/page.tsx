"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { IPlaylistMany } from "../lib/definitions";
import Icon from "../ui/icon";
import { colors } from "../ui/colors";
import { useState } from "react";
import Modal from "../ui/modals/modal";

export default function Page() {
  const playlists: IPlaylistMany[] = [
    {
      id: 1,
      name: "For studying English",
      coverNumber: 1,
      track_count: 4,
    },
    {
      id: 2,
      name: "Playlist#1",
      coverNumber: 2,
      track_count: 3,
    },
  ];
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalPlaylist, setDeleteModalPlaylist] =
    useState<IPlaylistMany | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <section>
      <h2 className={`${styles.h2} visually-hidden`}>Playlists</h2>
      <ul className={styles.list}>
        <li
          onClick={() => setCreateModalOpen(true)}
          key="add"
          className={`${styles.item} ${styles.add__btn}`}
        >
          <div className={styles.add__bg}>
            <Image
              src="/playlist_covers/default__add.jpg"
              width={360}
              height={360}
              className={styles.img__desktop}
              alt="Add new playlist"
            />
            <Image
              src="/playlist_covers/default__add.jpg"
              width={240}
              height={240}
              className={styles.img__tablet}
              alt="Add new playlist"
            />
            <Image
              src="/playlist_covers/default__add.jpg"
              width={99}
              height={99}
              className={styles.img__mobile}
              alt="Add new playlist"
            />
          </div>
          <div className={styles.content}>
            <h3 className={`${styles.h3} ${styles.h3__link}`}>
              <Icon
                type="plus"
                className={styles.add__icon}
                defaultColor={colors.black11}
              />
              Create new playlist
            </h3>
          </div>
        </li>
        {playlists.map((p) => (
          <li key={p.id} className={styles.item}>
            <Image
              src={`/playlist_covers/playlists%20(${p.coverNumber}).jpg`}
              width={360}
              height={360}
              className={styles.img__desktop}
              alt={`${p.name} cover`}
            />
            <Image
              src={`/playlist_covers/playlists__1440%20(${p.coverNumber}).jpg`}
              width={240}
              height={240}
              className={styles.img__tablet}
              alt={`${p.name} cover`}
            />
            <Image
              src={`/playlist_covers/playlists__360%20(${p.coverNumber}).jpg`}
              width={99}
              height={99}
              className={styles.img__mobile}
              alt={`${p.name} cover`}
            />
            <div className={styles.content}>
              <h3 className={styles.h3}>
                <Link className={styles.h3__link} href={`/playlist/${p.id}`}>
                  <span className={styles.name}>{p.name}</span>
                </Link>
              </h3>
              <span className={styles.count}>
                {p.track_count > 0 ? `${p.track_count} tracks` : "No tracks"}
              </span>
              <button
                className={styles.delete__btn}
                onClick={() => {
                  setDeleteModalOpen(true);
                  setDeleteModalPlaylist(p);
                }}
              >
                <Icon type="bin" defaultColor={colors.greyA4} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {deleteModalOpen ? (
        <Modal
          onClose={() => setDeleteModalOpen(false)}
          type="confirm"
          data={{
            title: `Delete playlist "${deleteModalPlaylist?.name}"?`,
            confirmText: "Delete",
            onConfirm: () => setDeleteModalOpen(false),
            onClose: () => setDeleteModalOpen(false),
          }}
        />
      ) : null}
      {createModalOpen ? (
        <Modal
          onClose={() => setCreateModalOpen(false)}
          type="createPlaylist"
        />
      ) : null}
    </section>
  );
}

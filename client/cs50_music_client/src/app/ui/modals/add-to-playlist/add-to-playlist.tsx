"use client";

import Image from "next/image";
import styles from "./add-to-playlist.module.css";
import { IPlaylistMany } from "@/app/lib/definitions";
import { useState } from "react";

export default function AddToPlaylist({ onClose }: { onClose: () => void }) {
  const playlists: IPlaylistMany[] = [
    {
      id: 1,
      name: "For studying English",
      coverNumber: 1,
      track_count: 5,
    },
    {
      id: 2,
      name: "Playlist#1",
      coverNumber: 2,
      track_count: 4,
    },
  ];

  const [playlistChosen, setPlaylistChosen] = useState(false);
  function validateChoice() {
    for (const playlist of playlists) {
      const input = document.getElementById(
        `${playlist.id}`
      ) as HTMLInputElement;
      if (input.checked) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className={styles.title}>Add to playlist</div>
      <form id="add-to-playlist-form" method="POST" className={styles.form}>
        <ul className={styles.playlist__content}>
          {playlists.map((p) => (
            <li key={p.id} className={styles.playlist}>
              <input
                onChange={() => setPlaylistChosen(validateChoice())}
                id={`${p.id}`}
                className={`${styles.checkbox} visually-hidden`}
                type="checkbox"
              />
              <label htmlFor={`${p.id}`} className={styles.label}>
                <Image
                  width={60}
                  height={60}
                  src="/playlist_covers/playlists%20(3).jpg"
                  alt={`${p.name} track cover`}
                  className={styles.playlist__image}
                />
                <div className={styles.playlist__title}>{p.name}</div>
                <div className={styles.playlist__info}>
                  {p.track_count > 0 ? `${p.track_count} tracks` : "No tracks"}
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <button
            type="submit"
            onClick={onClose}
            className={styles.submit__btn}
            disabled={!playlistChosen}
          >
            Done
          </button>
          <button type="button" onClick={onClose} className={styles.close__btn}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

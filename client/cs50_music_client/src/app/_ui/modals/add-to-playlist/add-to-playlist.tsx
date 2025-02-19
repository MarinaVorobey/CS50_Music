"use client";

import Image from "next/image";
import styles from "./add-to-playlist.module.css";
import { IPlaylistMany } from "@/app/_lib/definitions";
import { useState } from "react";
import { addToPlaylist, fetchPlaylistsForAdding } from "@/app/_lib/data";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import ErrorBlock from "../../network/error-block";
import Loading from "@/app/loading";
import { FieldValues, useForm } from "react-hook-form";
import AllAdded from "./all-added";
import { checkAddedQueueIntegrity } from "@/app/_lib/player-control";

interface IAddToPlaylistProps {
  onClose: () => void;
  id: string;
}

export default function AddToPlaylist({ onClose, id }: IAddToPlaylistProps) {
  const {
    data,
    isError,
    error,
    isLoading,
  }: UseQueryResult<IPlaylistMany[], AxiosError> = useQuery({
    queryKey: ["playlists_add"],
    queryFn: () => fetchPlaylistsForAdding(id),
    retry: (failureCount: number, error: AxiosError) =>
      error.response?.status !== 401 && failureCount < 1,
  });

  const { register, handleSubmit } = useForm();
  const [playlistChosen, setPlaylistChosen] = useState(false);
  function validateChoice() {
    if (!data) {
      return false;
    }

    for (const playlist of data) {
      const input = document.getElementById(
        `${playlist.id}`
      ) as HTMLInputElement;
      if (input.checked) {
        return true;
      }
    }
    return false;
  }

  const queryClient = useQueryClient();
  const mutation: UseMutationResult<AxiosResponse, AxiosError, FieldValues> =
    useMutation({
      mutationFn: (data: FieldValues) => addToPlaylist(id, data),
      onSuccess: (_, vars) => {
        queryClient.invalidateQueries({
          queryKey: ["playlists_add"],
        });
        queryClient.invalidateQueries({
          queryKey: ["playlist"],
        });
        setPlaylistChosen(false);
        checkAddedQueueIntegrity("playlist", queryClient, id, vars);
      },
    });

  if (isError) {
    const status =
      error && error.response
        ? error.response.status
        : mutation.error && mutation.error.response
        ? mutation.error.response.status
        : 500;
    return <ErrorBlock status={status} message="Something went wrong" />;
  }

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.title}>Add to playlist</div>
      {mutation.isSuccess ? (
        <p className={styles.success__message}>Added successfuly</p>
      ) : null}
      {!data.length ? (
        <AllAdded onClose={onClose} />
      ) : (
        <form
          onSubmit={handleSubmit((data: FieldValues) => mutation.mutate(data))}
          id="add-to-playlist-form"
          method="POST"
          className={styles.form}
        >
          <p className={styles.instruction}>Choose playlists:</p>
          <ul className={styles.playlist__content}>
            {data.map((p) => (
              <li key={p.id} className={styles.playlist}>
                <input
                  aria-label={`Add to playlist ${p.name}`}
                  {...register(`${p.id}`, {
                    onChange: () => setPlaylistChosen(validateChoice()),
                  })}
                  id={`${p.id}`}
                  className={`${styles.checkbox} visually-hidden`}
                  type="checkbox"
                />
                <label htmlFor={`${p.id}`} className={styles.label}>
                  <Image
                    width={60}
                    height={60}
                    src={`/playlist_covers/playlists%20(${p.cover}).jpg`}
                    alt={`${p.name} track cover`}
                    className={styles.playlist__image}
                  />
                  <div className={styles.playlist__title}>{p.name}</div>
                  <div className={styles.playlist__info}>
                    {p.track_count > 0
                      ? `${p.track_count} track${p.track_count > 1 ? "s" : ""}`
                      : "No tracks"}
                  </div>
                </label>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <button
              aria-label="Submit form"
              type="submit"
              className={styles.submit__btn}
              disabled={!playlistChosen || mutation.isPending}
            >
              Done
            </button>
            <button
              aria-label="Close modal"
              type="button"
              onClick={onClose}
              className={styles.close__btn}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </>
  );
}

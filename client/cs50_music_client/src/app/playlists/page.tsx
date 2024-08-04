"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { IPlaylistMany } from "../_lib/definitions";
import Icon from "../_ui/icon";
import { colors } from "../_ui/colors";
import { useState } from "react";
import Modal from "../_ui/modals/modal";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { deletePlaylist, fetchPlaylists, getUserToken } from "../_lib/data";
import Loading from "../loading";
import ErrorBlock from "../_ui/network/error-block";
import { useCheckMounted, useSearchPlaylists } from "../_lib/utils";

export default function Playlists() {
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const {
    data,
    isError,
    error,
    isLoading,
  }: UseQueryResult<IPlaylistMany[], AxiosError> = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
    retry: (failureCount: number, error: AxiosError) =>
      error.response?.status !== 401 && failureCount < 1,
    enabled: !!userToken.data,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalPlaylist, setDeleteModalPlaylist] =
    useState<IPlaylistMany | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const mutation: UseMutationResult<AxiosResponse, AxiosError> = useMutation({
    mutationFn: () => deletePlaylist(`${deleteModalPlaylist?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setDeleteModalOpen(false);
    },
  });

  const dataFiltered = useSearchPlaylists(data);
  const isMounted = useCheckMounted();
  if (!isMounted) {
    return null;
  }

  if (isLoading) return <Loading />;
  if (isError || mutation.isError || !userToken.data) {
    const status =
      error && error.response
        ? error.response.status
        : mutation.error && mutation.error.response
        ? mutation.error.response.status
        : !userToken.data
        ? 401
        : 500;
    return (
      <ErrorBlock
        status={status}
        message="Authenticate to create your own playlists"
      />
    );
  }

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
        {dataFiltered
          ? dataFiltered.map((p) => (
              <li key={p.id} className={styles.item}>
                <Image
                  src={`/playlist_covers/playlists%20(${p.cover}).jpg`}
                  width={360}
                  height={360}
                  className={styles.img__desktop}
                  alt={`${p.name} cover`}
                />
                <Image
                  src={`/playlist_covers/playlists__1440%20(${p.cover}).jpg`}
                  width={240}
                  height={240}
                  className={styles.img__tablet}
                  alt={`${p.name} cover`}
                />
                <Image
                  src={`/playlist_covers/playlists__360%20(${p.cover}).jpg`}
                  width={99}
                  height={99}
                  className={styles.img__mobile}
                  alt={`${p.name} cover`}
                />
                <div className={styles.content}>
                  <h3 className={styles.h3}>
                    <Link
                      className={styles.h3__link}
                      href={`/playlist/${p.id}`}
                    >
                      <span className={styles.name}>{p.name}</span>
                    </Link>
                  </h3>
                  <span className={styles.count}>
                    {p.track_count > 0
                      ? `${p.track_count} tracks`
                      : "No tracks"}
                  </span>
                  <button
                    className={styles.delete__btn}
                    onClick={() => {
                      setDeleteModalPlaylist(p);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Icon type="bin" defaultColor={colors.greyA4} />
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>

      {deleteModalOpen ? (
        <Modal
          onClose={() => setDeleteModalOpen(false)}
          type="confirm"
          data={{
            title: `Delete playlist "${deleteModalPlaylist?.name}"?`,
            confirmText: "Delete",
            onConfirm: mutation.mutate,
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

"use client";

import Link from "next/link";
import Icon, { TIconNames } from "../../icon";
import { colors } from "../../colors";
import styles from "./side-navbar.module.css";
import { usePathname } from "next/navigation";
import { moveSearchbar } from "@/app/lib/utils";
import { useState } from "react";
import { fetchPlaylists, getUserToken } from "@/app/lib/data";
import { IPlaylistMany } from "@/app/lib/definitions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ILinkInfo {
  iconType?: TIconNames;
  className?: string;
  iconClassName?: string;
  text: string;
  path: string;
}

export default function SideNavbar() {
  const pathname = usePathname();
  const [searchActive, setSearchActive] = useState(false);

  const specialLinks: ILinkInfo[] = [
    {
      iconType: "play2",
      className: styles.link,
      path: "/",
      text: "Tracks",
    },
    {
      iconType: "note",
      className: styles.link,
      path: "/playlists",
      text: "Playlists",
    },
    {
      iconType: "heart2",
      className: `${styles.special} ${styles.link}`,
      path: "/favorites",
      text: "Favorites",
    },
  ];

  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const { data, isSuccess }: UseQueryResult<IPlaylistMany[], AxiosError> =
    useQuery({
      queryKey: ["playlists"],
      queryFn: async () => await fetchPlaylists(),
      retry: (failureCount: number, error: AxiosError) =>
        error.response?.status !== 401 && failureCount < 1,
      enabled: !!userToken.data,
    });

  return (
    <aside className={styles.aside}>
      <h2 className="visually-hidden">Left navigation pannel</h2>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {specialLinks.map(({ text, path, className, iconType }) => (
            <li key={path} className={styles.item}>
              <Link
                href={path}
                className={
                  pathname === path
                    ? `${className} ${styles.link__active}`
                    : className
                }
              >
                {iconType ? (
                  <Icon
                    type={iconType}
                    className={styles.icon}
                    defaultColor={
                      pathname === path ? colors.whiteFF : colors.orange
                    }
                  />
                ) : null}
                <span className={styles.link__text}>{text}</span>
              </Link>
            </li>
          ))}
          <li key="search" className={styles.item}>
            <button
              onClick={() => {
                setSearchActive((prev) => !prev);
                moveSearchbar();
              }}
              className={`${styles.search__btn} ${styles.link}${
                searchActive ? " " + styles.link__active : ""
              }`}
            >
              <Icon
                type="search"
                className={styles.search__icon}
                defaultColor={searchActive ? colors.whiteFF : colors.orange}
              />
            </button>
          </li>
        </ul>

        {isSuccess && data.length ? (
          <div className={styles.playlists}>
            <h3 className={styles.list__title}>Playlists:</h3>
            <ul className={styles.list}>
              {data.map(({ name, id }) => (
                <li key={id} className={styles.item}>
                  <Link
                    href={`/playlist/${id}`}
                    className={
                      pathname === `/playlist/${id}`
                        ? `${styles.link} ${styles.link__active}`
                        : styles.link
                    }
                  >
                    <span className={styles.link__text}>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </aside>
  );
}

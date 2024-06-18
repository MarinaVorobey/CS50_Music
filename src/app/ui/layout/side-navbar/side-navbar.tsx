import Link from "next/link";
import Icon, { TIconNames } from "../../icon";
import { colors } from "../../colors";
import styles from "./side-navbar.module.css";

interface ILinkInfo {
  iconType?: TIconNames;
  className?: string;
  iconClassName?: string;
  text: string;
  path: string;
}

export default function SideNavbar() {
  const specialLinks: ILinkInfo[] = [
    {
      iconType: "play2",
      className: styles.link,
      path: "tracks",
      text: "Tracks",
    },
    {
      iconType: "note",
      className: styles.link,
      path: "playlists",
      text: "Playlists",
    },
    {
      iconType: "heart2",
      className: `${styles.special} ${styles.link__active}`,
      path: "favorites",
      text: "Favorites",
    },
  ];

  const playlists: ILinkInfo[] = [
    {
      path: "playlist#1",
      text: "Playlist #1",
    },
    {
      path: "playlist#2",
      text: "Playlist #2",
    },
    {
      path: "playlist#3",
      text: "Playlist #3",
    },
  ];

  return (
    <aside className={styles.aside}>
      <h2 className="visually-hidden">Left navigation pannel</h2>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {specialLinks.map(({ text, path, className, iconType }) => (
            <li key={path} className={styles.item}>
              <Link href={path} className={className}>
                {iconType ? (
                  <Icon
                    type={iconType}
                    className={styles.icon}
                    defaultColor={
                      className?.includes("link__active")
                        ? colors.whiteFF
                        : colors.orange
                    }
                  />
                ) : null}
                <span className={styles.link__text}>{text}</span>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className={styles.list__title}>Playlists:</h3>
        <ul className={styles.list}>
          {playlists.map(({ text, path }) => (
            <li key={path} className={styles.item}>
              <Link href={path} className={styles.link}>
                <span className={styles.link__text}>{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

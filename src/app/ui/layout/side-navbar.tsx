import Link from "next/link";
import Icon, { TIconNames } from "../icon";
import { colors } from "../colors";

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
      iconClassName: "aside__icon",
      className: "aside__link aside__special-link",
      path: "tracks",
      text: "Tracks",
    },
    {
      iconType: "note",
      iconClassName: "aside__icon",
      className: "aside__link aside__special-link",
      path: "playlists",
      text: "Playlists",
    },
    {
      iconType: "heart2",
      iconClassName: "aside__icon-favorites",
      className: "aside__special-link aside__link-active",
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
      path: "playlists",
      text: "Playlist #2",
    },
    {
      path: "favorites",
      text: "Playlist #3",
    },
  ];

  return (
    <aside className="aside">
      <h2 className="aside__h2 visually-hidden">Left navigation pannel</h2>

      <nav className="aside__nav">
        <ul className="aside__list">
          {specialLinks.map(
            ({ text, path, className, iconClassName, iconType }) => (
              <li key={path} className="aside__item">
                <Link href={path} className={className}>
                  {iconType ? (
                    <Icon
                      type={iconType}
                      className={iconClassName}
                      defaultColor={
                        className?.includes("aside__link-active")
                          ? colors.whiteFF
                          : colors.orange
                      }
                    />
                  ) : null}
                  <span className="aside__link__text">{text}</span>
                </Link>
              </li>
            )
          )}

          {playlists.map(({ text, path }) => (
            <li key={path} className="aside__item">
              <Link href={path} className="aside__link">
                <span className="aside__link__text">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

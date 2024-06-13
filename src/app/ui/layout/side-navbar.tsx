import Icon from "../icon";

export default function SideNavbar() {
  return (
    <aside className="aside">
      <h2 className="aside__h2 visually-hidden">Left navigation pannel</h2>
      <nav className="aside__nav">
        <button className="search__btn-open">
          <Icon type="search" />
        </button>
        <ul className="aside__list">
          <li className="aside__item">
            <button
              className="aside__btn aside__tabs-btn aside__btn-active"
              data-path="tracks"
            >
              <Icon type="play2" />
              <span className="aside__btn__text">Tracks</span>
            </button>
          </li>
          <li className="aside__item">
            <button
              className="aside__btn aside__tabs-btn"
              data-path="playlists"
            >
              <Icon type="note" />
              <span className="aside__btn__text">Playlists</span>
            </button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">
              <Icon type="heart2" />
              <span className="aside__btn__text">Favorite</span>
            </button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #1</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #2</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #3</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #4</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #5</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #6</button>
          </li>
          <li className="aside__item">
            <button className="aside__btn">Playlist #7</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

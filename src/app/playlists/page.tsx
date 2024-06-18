export default function Page() {
  return (
    <section className="playlist section tabs-content" data-target="playlists">
      <h2 className="playlist__h2 visually-hidden">Плейлисты</h2>
      <ul className="playlist__list">
        <li className="playlist__item">
          <picture>
            <source
              srcSet="img/playlists__360%20(1).jpg"
              media="(max-width: 576px)"
            />
            <source
              srcSet="img/playlists__1440%20(1).jpg"
              media="(max-width: 1440px)"
            />
            <img
              className="playlist__img"
              src="img/playlists%20(1).jpg"
              alt="Любимые песни"
            />
          </picture>
          <div className="playlist__content">
            <h3 className="playlist__h3">
              <a className="playlist__h3__link" href="/">
                Любимые песни
              </a>
            </h3>
            <span className="playlist__count">58 треков</span>
          </div>
        </li>
        <li className="playlist__item">
          <picture>
            <source
              srcSet="img/playlists__360%20(1).jpg"
              media="(max-width: 576px)"
            />
            <source
              srcSet="img/playlists__1440%20(1).jpg"
              media="(max-width: 1440px)"
            />
            <img
              className="playlist__img"
              src="img/playlists%20(1).jpg"
              alt="Любимые песни"
            />
          </picture>
          <div className="playlist__content">
            <h3 className="playlist__h3">
              <a className="playlist__h3__link" href="/">
                Плейлист #1
              </a>
            </h3>
            <span className="playlist__count">58 треков</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

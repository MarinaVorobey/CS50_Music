import Image from "next/image";
import Icon, { TIconNames } from "../../icon";
import { colors } from "../../colors";
import styles from "./player.module.css";

interface IControlButtonInfo {
  iconType: TIconNames;
  className: string;
  iconClassName: string;
}

export default function Player() {
  const controls: IControlButtonInfo[] = [
    {
      iconType: "shuffle",
      className: `${styles.controls__btn} ${styles.shuffle__btn}`,
      iconClassName: styles.shuffle__btn__icon,
    },
    {
      iconType: "play-prev",
      className: `${styles.controls__btn} ${styles.skipback__btn}`,
      iconClassName: styles.skipback__btn__icon,
    },
    {
      iconType: "play",
      className: styles.play__btn,
      iconClassName: styles.play__btn__icon,
    },
    {
      iconType: "play-next",
      className: `${styles.controls__btn} ${styles.skipnext__btn}`,
      iconClassName: styles.skipnext__btn__icon,
    },
    {
      iconType: "repeat",
      className: `${styles.controls__btn} ${styles.repeat__btn}`,
      iconClassName: styles.repeat__btn__icon,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`${styles.player} flex`}>
        <div className={`${styles.track__name} flex`}>
          <Image
            className={styles.track__img}
            src="/track_covers/cover1.jpg"
            width={60}
            height={60}
            alt="Histoire Sans Nom - Ludovico Einaudi, Czech National Symphony Orchestra"
          />
          <div className={styles.track__name__content}>
            <div className={`${styles.name__header} flex`}>
              <h3 className={styles.track__h3}>Histoire Sans Nom</h3>
              <button className={styles.track__like}>
                <Icon
                  type="heart"
                  className={styles.track__like__icon}
                  defaultColor={colors.orange}
                />
              </button>
            </div>
            <p className={styles.track__author}>
              Ludovico Einaudi, Czech National Symphony Orchestra
            </p>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.controls__header}>
            {controls.map((c) => (
              <button key={c.iconType} className={c.className}>
                <Icon
                  type={c.iconType}
                  className={c.iconClassName}
                  defaultColor={colors.greyAA}
                />
              </button>
            ))}
          </div>
          <div className={styles.controls__footer}>
            <span className={styles.time__start}>0:26</span>
            <div className={styles.range__play} id="range-play"></div>
            <span className={styles.time__end}>0:26</span>
          </div>
        </div>
        <div className={styles.volume}>
          <Icon type="sound" defaultColor={colors.greyAA} />
          <div className={styles.volume__range} id="range-value"></div>
        </div>
      </div>
    </footer>
  );
}

import { colors } from "../../colors";
import Icon from "../../icon";
import { controlsSkeletonInfo } from "./controls/buttons";
import styles from "./player.module.css";

export default function PlayerSkeleton() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.player} ${styles.skeleton__player} flex`}>
        <div className={styles.artist__placeholder}></div>
        <div className={styles.controls}>
          <div className={styles.controls__header}>
            {controlsSkeletonInfo.map((c) => (
              <button disabled={true} key={c.iconType} className={c.className}>
                <Icon
                  type={c.iconType}
                  className={c.iconClassName}
                  defaultColor={colors.greyAA}
                />
              </button>
            ))}
          </div>
          <div className={styles.controls__footer}>
            <span className={styles.time__start}>0:00</span>
            <div className={styles.range__play} id="range-play"></div>
            <span className={styles.time__end}>0:00</span>
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

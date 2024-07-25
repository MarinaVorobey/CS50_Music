import { TIconNames } from "@/app/ui/icon";
import styles from "../player.module.css";

interface IControlButtonInfo {
  iconType: TIconNames;
  className: string;
  iconClassName: string;
}

export const controlsSkeletonInfo: IControlButtonInfo[] = [
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

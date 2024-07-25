"use client";

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";

export default function Play() {
  return (
    <button key="play" className={styles.play__btn}>
      <Icon
        type="play"
        className={styles.play__btn__icon}
        defaultColor={colors.greyAA}
      />
    </button>
  );
}

"use client";

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { useState } from "react";

export default function Play() {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      onClick={() => setPlaying((prev) => !prev)}
      key="play"
      className={styles.play__btn}
    >
      <Icon
        type={playing ? "pause" : "play"}
        className={styles.play__btn__icon}
        defaultColor={colors.greyAA}
      />
    </button>
  );
}

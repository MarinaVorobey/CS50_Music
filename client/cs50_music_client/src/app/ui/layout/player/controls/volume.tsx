import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { useState } from "react";
import { AudioController } from "./AudioController";

interface IVolumeProps {
  hasController: boolean;
  audioController: AudioController | null;
}

export function Volume({ audioController, hasController }: IVolumeProps) {
  const [volume, setVolume] = useState("1");
  const [prevVolume, setPrevVolume] = useState("1");

  return (
    <div className={styles.volume}>
      <button
        onClick={() => {
          if (hasController) {
            audioController?.changeVolume(volume === "0" ? prevVolume : "0");
          }
          setVolume((prev) => (prev === "0" ? prevVolume : "0"));
        }}
      >
        <Icon type="sound" defaultColor={colors.greyAA} />
      </button>
      <input
        aria-label="Volume"
        onChange={(e) => {
          if (volume !== "0") {
            setPrevVolume(volume);
          }
          setVolume(e.target.value);
          audioController?.changeVolume(e.target.value);
        }}
        className={styles.volume__range}
        type="range"
        id="volume"
        min="0"
        max="2"
        value={volume}
        step="0.01"
      />
    </div>
  );
}

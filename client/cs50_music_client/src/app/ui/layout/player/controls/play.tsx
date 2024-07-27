"use client";

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AudioController } from "./AudioController";

export function Play({
  audioController,
  audioElement,
  setController,
}: {
  audioController: AudioController | null;
  audioElement: MutableRefObject<HTMLAudioElement | null>;
  setController: Dispatch<SetStateAction<AudioController | null>>;
}) {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(audioElement.current);

  useEffect(() => {
    setAudio(audioElement.current);
  }, [audioElement]);

  function handlePlay() {
    if (!audioController && audio) {
      setController(new AudioController(audio));
    }
    if (!playing) {
      audio?.play();
    } else {
      audio?.pause();
    }
    setPlaying((prev) => !prev);
  }

  return (
    <button
      onClick={() => handlePlay()}
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

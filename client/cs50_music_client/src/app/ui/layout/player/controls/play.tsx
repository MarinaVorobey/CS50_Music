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

interface IPlayProps {
  currSrc: string;
  audioController: MutableRefObject<AudioController | null>;
  audioElement: MutableRefObject<HTMLAudioElement | null>;
  setHasController: Dispatch<SetStateAction<boolean>>;
}

export function Play({
  audioController,
  audioElement,
  setHasController,
  currSrc,
}: IPlayProps) {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(audioElement.current);

  useEffect(() => {
    if (audioElement.current && playing) {
      audioElement.current.play();
    }
    setAudio(audioElement.current);
  }, [audioElement, currSrc, playing]);

  function handlePlay() {
    if (!audioController.current && audio) {
      audioController.current = new AudioController(audio);
      setHasController(true);
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
      aria-label={playing ? "Pause track" : "Play track"}
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

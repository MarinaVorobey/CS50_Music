"use client";

import { ITrack } from "@/app/lib/definitions";
import styles from "../player.module.css";
import { AudioController } from "./AudioController";
import { formatDuration, formatDurationFromNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";

interface IProgressProps {
  data?: ITrack;
  controller: AudioController | null;
  hasController: boolean;
}

export default function Progress({
  data,
  controller,
  hasController,
}: IProgressProps) {
  const [currTime, setCurrTime] = useState(
    hasController && controller ? controller.elapsedTime : 0
  );

  useEffect(() => {
    if (hasController && controller) {
      const interval = setInterval(() => {
        setCurrTime(controller.elapsedTime ?? 0);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [controller, currTime, hasController]);

  return (
    <div className={styles.controls__footer}>
      <span className={styles.time__start}>
        {formatDurationFromNumber(currTime)}
      </span>
      {controller ? (
        <input
          aria-label="Progress input for the track"
          className={styles.range__play}
          onChange={(e) => {
            controller.elapsedTime = +e.target.value;
            setCurrTime(+e.target.value);
          }}
          id="range-play"
          type="range"
          min={0}
          max={
            !controller?.audio?.duration ||
            Number.isNaN(controller.audio.duration)
              ? 0
              : controller.audio.duration
          }
          value={currTime}
          step="1.00"
        />
      ) : (
        <div className={styles.range__play} id="range-play"></div>
      )}
      <span className={styles.time__end}>
        {data ? formatDuration(data.duration) : "0:00"}
      </span>
    </div>
  );
}

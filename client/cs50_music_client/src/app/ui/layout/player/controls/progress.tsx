"use client";

import { ITrack } from "@/app/lib/definitions";
import styles from "../player.module.css";
import { AudioController } from "./AudioController";
import { formatDuration, formatDurationFromNumber } from "@/app/lib/utils";
import { useEffect, useState } from "react";

export default function Progress({
  data,
  controller,
}: {
  data?: ITrack;
  controller: AudioController | null;
}) {
  const [currTime, setCurrTime] = useState(
    controller ? controller.elapsedTime : 0
  );
  useEffect(() => {
    if (controller) {
      const interval = setInterval(() => {
        setCurrTime(controller.elapsedTime ?? 0);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [controller, currTime]);

  return (
    <div className={styles.controls__footer}>
      <span className={styles.time__start}>
        {formatDurationFromNumber(currTime)}
      </span>
      {controller ? (
        <input
          className={styles.range__play}
          onChange={(e) => {
            controller.elapsedTime = +e.target.value;
            setCurrTime(+e.target.value);
          }}
          id="range-play"
          type="range"
          min={0}
          max={controller.audio.duration}
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

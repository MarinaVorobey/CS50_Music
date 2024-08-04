"use client";

import { colors } from "@/app/_ui/colors";
import Icon from "@/app/_ui/icon";
import styles from "../player.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skipBack } from "@/app/_lib/player-control";
import { IPlayerData } from "@/app/_lib/definitions";

export function Skipback({ data }: { data: IPlayerData }) {
  const queryClient = useQueryClient();
  const skipBackMutation = useMutation({
    mutationFn: skipBack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      aria-label="Previous track"
      onClick={() => skipBackMutation.mutate(data)}
      disabled={!data || !data.previous.length}
      key="play-prev"
      className={`${styles.controls__btn} ${styles.skipback__btn}`}
    >
      <Icon
        type={"play-prev"}
        className={styles.skipback__btn__icon}
        defaultColor={colors.greyAA}
      />
    </button>
  );
}

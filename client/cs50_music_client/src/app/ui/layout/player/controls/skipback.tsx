"use client";

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlayerData, skipBack } from "@/app/lib/player-control";

export function Skipback() {
  const queryClient = useQueryClient();
  const playerData = useQuery({
    queryKey: ["player_data"],
    queryFn: getPlayerData,
  });

  const skipBackMutation = useMutation({
    mutationFn: skipBack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      onClick={() => skipBackMutation.mutate(playerData.data)}
      disabled={!playerData.data || !playerData.data.previous.length}
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

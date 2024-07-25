"use client";

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { getPlayerData, skipNext } from "@/app/lib/player-control";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function Skipnext() {
  const queryClient = useQueryClient();
  const playerData = useQuery({
    queryKey: ["player_data"],
    queryFn: getPlayerData,
  });

  const skipNextMutation = useMutation({
    mutationFn: skipNext,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      onClick={() => skipNextMutation.mutate(playerData.data)}
      disabled={!playerData.data || !playerData.data.next.length}
      key="skip-next"
      className={`${styles.controls__btn} ${styles.skipnext__btn}`}
    >
      <Icon
        type="play-next"
        className={styles.skipnext__btn__icon}
        defaultColor={colors.greyAA}
      />
    </button>
  );
}

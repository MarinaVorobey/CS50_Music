import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { getPlayerData, toggleRepeat } from "@/app/lib/player-control";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export function Repeat() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["player_data"],
    queryFn: getPlayerData,
  });

  const repeatMutation = useMutation({
    mutationFn: toggleRepeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      onClick={() => repeatMutation.mutate()}
      key="repeat"
      className={`${styles.controls__btn} ${styles.repeat__btn}`}
    >
      <Icon
        type="repeat"
        className={styles.repeat__btn__icon}
        defaultColor={data && data.on_repeat ? colors.orange : colors.greyAA}
      />
    </button>
  );
}

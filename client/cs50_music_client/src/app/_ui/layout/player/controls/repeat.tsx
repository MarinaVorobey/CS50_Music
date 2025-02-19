import { colors } from "@/app/_ui/colors";
import Icon from "@/app/_ui/icon";
import styles from "../player.module.css";
import { toggleRepeat } from "@/app/_lib/player-control";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IPlayerData } from "@/app/_lib/definitions";

export function Repeat({ data }: { data: IPlayerData }) {
  const queryClient = useQueryClient();
  const repeatMutation = useMutation({
    mutationFn: toggleRepeat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      aria-label={
        data && data.on_repeat ? "Stop repeating track" : "Repeat track"
      }
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

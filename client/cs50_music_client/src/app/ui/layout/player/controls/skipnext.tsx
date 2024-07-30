import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { skipNext } from "@/app/lib/player-control";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IPlayerData } from "@/app/lib/definitions";

export function Skipnext({ data }: { data: IPlayerData }) {
  const queryClient = useQueryClient();
  const skipNextMutation = useMutation({
    mutationFn: skipNext,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      aria-label="Next track"
      onClick={() => skipNextMutation.mutate(data)}
      disabled={!data || !data.next.length}
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

import { colors } from "@/app/ui/colors";
import Icon from "@/app/ui/icon";
import styles from "../player.module.css";
import { shuffle } from "@/app/lib/player-control";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Shuffle() {
  const queryClient = useQueryClient();
  const shuffleMutation = useMutation({
    mutationFn: shuffle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  return (
    <button
      onClick={() => shuffleMutation.mutate()}
      key="shuffle"
      className={`${styles.controls__btn} ${styles.shuffle__btn}`}
    >
      <Icon
        type="shuffle"
        className={styles.shuffle__btn__icon}
        defaultColor={colors.greyAA}
      />
    </button>
  );
}

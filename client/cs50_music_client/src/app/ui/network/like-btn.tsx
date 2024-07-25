import { getUserToken, likeTrack } from "@/app/lib/data";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { colors } from "../colors";
import Icon from "../icon";
import styles from "./network.module.css";
import { checkAddedQueueIntegrity } from "@/app/lib/player-control";

export default function LikeBtn({ liked, id }: { liked: boolean; id: number }) {
  const queryClient = useQueryClient();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const likeAction = useMutation({
    mutationFn: () => likeTrack(`${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      // checkAddedQueueIntegrity("favorite", queryClient, `${id}`);
    },
  });

  return (
    <button
      onClick={() => likeAction.mutate()}
      disabled={!userToken.data}
      className={styles.like__btn}
    >
      <Icon type="heart" defaultColor={liked ? colors.orange : colors.greyA4} />
    </button>
  );
}

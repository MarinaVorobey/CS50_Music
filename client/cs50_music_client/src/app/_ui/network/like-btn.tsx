import { getUserToken, likeTrack } from "@/app/lib/data";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { colors } from "../colors";
import Icon from "../icon";
import styles from "./network.module.css";
import {
  checkAddedQueueIntegrity,
  checkRemovedQueueIntegrity,
} from "@/app/lib/player-control";

interface ILikeBtnProps {
  liked: boolean;
  id: number;
}

export default function LikeBtn({ liked, id }: ILikeBtnProps) {
  const queryClient = useQueryClient();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
  const likeAction = useMutation({
    mutationFn: () => likeTrack(`${id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data) {
        checkAddedQueueIntegrity("favorite", queryClient, `${id}`);
      } else {
        checkRemovedQueueIntegrity("favorite", queryClient, `${id}`);
      }
    },
  });

  return (
    <button
      aria-label="Like the track"
      onClick={() => likeAction.mutate()}
      disabled={!userToken.data}
      className={styles.like__btn}
    >
      <Icon type="heart" defaultColor={liked ? colors.orange : colors.greyA4} />
    </button>
  );
}

"use client";

import Image from "next/image";
import styles from "./player.module.css";
import { IPlayerData, ITrack } from "@/app/_lib/definitions";
import { fetchCurrentTrack } from "@/app/_lib/data";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import LikeBtn from "../../network/like-btn";
import PlayerSkeleton from "./player-skeleton";
import { useRef, useState } from "react";
import { getPlayerData, skipNext } from "@/app/_lib/player-control";
import { AudioController } from "./controls/AudioController";
import { Skipback, Skipnext, Play, Shuffle, Repeat, Volume } from "./controls";
import Progress from "./controls/progress";

export default function Player() {
  const { data, isError, isLoading }: UseQueryResult<ITrack, AxiosError> =
    useQuery({
      queryKey: ["curr_track"],
      queryFn: fetchCurrentTrack,
    });

  const playerData: UseQueryResult<IPlayerData, Error> = useQuery({
    queryKey: ["player_data"],
    queryFn: getPlayerData,
  });

  const queryClient = useQueryClient();
  const skipNextMutation = useMutation({
    mutationFn: skipNext,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curr_track"] });
      queryClient.invalidateQueries({ queryKey: ["player_data"] });
    },
  });

  const controller = useRef<AudioController | null>(null);
  const [hasController, setHasController] = useState(!!controller.current);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  if (isLoading || isError || !data || !playerData.data) {
    return <PlayerSkeleton />;
  }

  return (
    <footer className={styles.footer}>
      <audio
        src={`/tracks/${data?.path}`}
        loop={playerData.data ? playerData.data.on_repeat : false}
        ref={audioElement}
        onEnded={() => skipNextMutation.mutate(playerData.data)}
      ></audio>
      <div className={`${styles.player} flex`}>
        <div className={`${styles.track__name} flex`}>
          <Image
            className={styles.track__img}
            src={`/artist_covers/${data.artist.image}`}
            width={60}
            height={60}
            alt={`${data.artist.name} - ${data.name}`}
          />
          <div className={styles.track__name__content}>
            <div className={`${styles.name__header} flex`}>
              <h3 className={styles.track__h3}>{data.name}</h3>
              <LikeBtn id={data?.id ?? 1} liked={data?.liked ?? false} />
            </div>
            <Link href={`/artist/${data.artist.id}`} className={styles.artist}>
              {data.artist.name}
            </Link>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.controls__header}>
            <Shuffle />
            <Skipback data={playerData.data} />
            <Play
              currSrc={data.path}
              setHasController={setHasController}
              audioController={controller}
              audioElement={audioElement}
            />
            <Skipnext data={playerData.data} />
            <Repeat data={playerData?.data} />
          </div>
          <Progress
            hasController={hasController}
            controller={controller.current}
            data={data}
          />
        </div>
        <Volume
          hasController={hasController}
          audioController={controller.current}
        />
      </div>
    </footer>
  );
}

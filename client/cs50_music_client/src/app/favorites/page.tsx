"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "../lib/data";
import { ITrack } from "../lib/definitions";
import Loading from "../loading";
import TrackList from "../ui/track-list/track-list";
import { AxiosError } from "axios";
import ErrorBlock from "../ui/network/error-block";

export default function Favorites() {
  const {
    data,
    isError,
    error,
    isLoading,
  }: UseQueryResult<ITrack[], AxiosError> = useQuery({
    queryKey: ["favorite"],
    queryFn: async () => await fetchFavorites(),
    retry: (failureCount: number, error: AxiosError) =>
      error.response?.status !== 401 && failureCount < 3,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <ErrorBlock
        status={error.response?.status ?? 500}
        message="Log in to like tracks and view your favorites"
      />
    );
  }

  return (
    <TrackList
      type="favorite"
      tracks={data ? data : []}
      title="Favorite tracks"
    />
  );
}

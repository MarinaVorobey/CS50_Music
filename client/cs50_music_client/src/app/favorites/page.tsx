"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchFavorites, getUserToken } from "../_lib/data";
import { ITrack } from "../_lib/definitions";
import Loading from "../loading";
import TrackList from "../_ui/track-list/track-list";
import { AxiosError } from "axios";
import ErrorBlock from "../_ui/network/error-block";
import SearchResult from "../_ui/network/search-result";
import { useCheckMounted, useSearchTracks } from "../_lib/utils";

export default function Favorites() {
  const searched = useSearchTracks();
  const userToken = useQuery({ queryKey: ["user"], queryFn: getUserToken });
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
    enabled: !!userToken.data,
  });

  const isMounted = useCheckMounted();
  if (!isMounted) {
    return null;
  }

  if (isLoading) return <Loading />;
  if (isError || !userToken.data) {
    const status =
      error && error.response
        ? error.response.status
        : !userToken.data
        ? 401
        : 500;
    return (
      <ErrorBlock
        status={status}
        message="Log in to like tracks and view your favorites"
      />
    );
  }

  if (searched) {
    return <SearchResult />;
  }

  return (
    <TrackList
      type="favorite"
      tracks={data ? data : []}
      title="Favorite tracks"
    />
  );
}

"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import TrackList from "./_ui/track-list/track-list";
import { fetchTracks } from "./lib/data";
import { ITrack } from "./lib/definitions";
import { AxiosError } from "axios";
import ErrorBlock from "./_ui/network/error-block";
import SearchResult from "./_ui/network/search-result";
import { useSearchTracks } from "./lib/utils";

export default function Home() {
  const searched = useSearchTracks();

  const {
    data,
    error,
    isError,
    isLoading,
  }: UseQueryResult<ITrack[], AxiosError> = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => await fetchTracks(),
    retry: 1,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    return <ErrorBlock status={error.response?.status ?? 500} message="" />;
  }

  if (searched) {
    return <SearchResult />;
  }

  return <TrackList tracks={data ? data : []} title="All tracks" type="all" />;
}

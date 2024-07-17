"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import TrackList from "./ui/track-list/track-list";
import { fetchTracks } from "./lib/data";
import { ITrack } from "./lib/definitions";
import { AxiosError } from "axios";
import ErrorBlock from "./ui/network/error-block";

export default function Home() {
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

  return <TrackList tracks={data ? data : []} title="All tracks" type="all" />;
}

"use client";

import { fetchTracks } from "@/app/_lib/data";
import { ITrack } from "@/app/_lib/definitions";
import Loading from "@/app/loading";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import TrackList from "../track-list/track-list";
import ErrorBlock from "./error-block";
import { Suspense } from "react";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const {
    data,
    error,
    isError,
    isLoading,
  }: UseQueryResult<ITrack[], AxiosError> = useQuery({
    queryKey: ["search"],
    queryFn: async () => await fetchTracks(query),
    retry: 1,
  });

  if (isLoading || !query) return <Loading />;
  if (isError) {
    return <ErrorBlock status={error.response?.status ?? 500} />;
  }

  return (
    <TrackList
      tracks={data ? data : []}
      title={`Search result for "${query}"`}
      type="search"
    />
  );
}

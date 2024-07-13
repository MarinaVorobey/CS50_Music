"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import TrackList from "./ui/track-list/track-list";
import { fetchTracks } from "./lib/data";
import { ITrack } from "./lib/definitions";

export default function Home() {
  const { data, isError, isLoading }: UseQueryResult<ITrack[], Error> =
    useQuery({
      queryKey: ["tracks"],
      queryFn: async () => await fetchTracks(),
    });

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return <TrackList tracks={data ? data : []} title="All tracks" type="all" />;
}

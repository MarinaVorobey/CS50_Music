"use client";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchTracks } from "../lib/data";
import { ITrack } from "../lib/definitions";
import Loading from "../loading";
import TrackList from "../ui/track-list/track-list";

export default function Favorites() {
  const { data, isError, isLoading }: UseQueryResult<ITrack[], Error> =
    useQuery({
      queryKey: ["favorite"],
      queryFn: async () => await fetchTracks(),
    });

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <TrackList
      type="favorite"
      tracks={data ? data : []}
      title="Favorite tracks"
    />
  );
}

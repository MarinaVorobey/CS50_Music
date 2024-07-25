"use client";

import { fetchArtist } from "@/app/lib/data";
import { IArtistData } from "@/app/lib/definitions";
import { useSearchTracks } from "@/app/lib/utils";
import Loading from "@/app/loading";
import ErrorBlock from "@/app/ui/network/error-block";
import SearchResult from "@/app/ui/network/search-result";
import TrackList from "@/app/ui/track-list/track-list";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export default function Artist() {
  const searched = useSearchTracks();
  const id = useParams().id as string;
  const {
    data,
    error,
    isError,
    isLoading,
  }: UseQueryResult<IArtistData, AxiosError> = useQuery({
    queryKey: ["artist", id],
    queryFn: async ({ queryKey }) => await fetchArtist(queryKey[1]),
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorBlock status={error.response?.status ?? 500} />;
  }

  if (searched) {
    return <SearchResult />;
  }

  return (
    <TrackList
      type="artist"
      tracks={data ? data.tracks : []}
      image={data ? data.image : ""}
      title={data ? data.name : ""}
    />
  );
}

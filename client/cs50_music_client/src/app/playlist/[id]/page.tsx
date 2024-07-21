"use client";

import { fetchPlaylist } from "@/app/lib/data";
import { IPlaylistSingle } from "@/app/lib/definitions";
import { useSearchTracks } from "@/app/lib/utils";
import Loading from "@/app/loading";
import ErrorBlock from "@/app/ui/network/error-block";
import SearchResult from "@/app/ui/network/search-result";
import TrackList from "@/app/ui/track-list/track-list";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export default function Playlist() {
  const searched = useSearchTracks();
  const id = useParams().id as string;
  const {
    data,
    error,
    isError,
    isLoading,
  }: UseQueryResult<IPlaylistSingle, AxiosError> = useQuery({
    queryKey: ["playlist", id],
    queryFn: async ({ queryKey }) => await fetchPlaylist(queryKey[1]),
  });

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <ErrorBlock
        status={error.response?.status ?? 500}
        message="Logged in users can make and view their playlists."
      />
    );
  }

  if (searched) {
    return <SearchResult />;
  }

  return (
    <TrackList
      type="playlist"
      tracks={data ? data.tracks_data : []}
      image={data ? `playlists%20(${data.cover}).jpg` : ""}
      title={data ? data.name : ""}
    />
  );
}

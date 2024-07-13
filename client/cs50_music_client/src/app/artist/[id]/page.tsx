"use client";

import { fetchArtist } from "@/app/lib/data";
import { IArtistData } from "@/app/lib/definitions";
import Loading from "@/app/loading";
import TrackList from "@/app/ui/track-list/track-list";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Artist() {
  const id = useParams().id[0];
  const { data, isError, isLoading }: UseQueryResult<IArtistData, Error> =
    useQuery({
      queryKey: ["artist", { id }],
      queryFn: async () => await fetchArtist({ id }),
    });

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <TrackList
      type="artist"
      id={id}
      tracks={data ? data.tracks : []}
      image={data ? data.image : ""}
      title={data ? data.name : ""}
    />
  );
}

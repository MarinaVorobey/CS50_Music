import { fetchTracks } from "@/app/lib/data";
import { IPlaylistSingle } from "@/app/lib/definitions";
import Loading from "@/app/loading";
import TrackList from "@/app/ui/track-list/track-list";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Playlist() {
  const id = useParams().id;
  const { data, isError, isLoading }: UseQueryResult<IPlaylistSingle, Error> =
    useQuery({
      queryKey: [`playlist${id[0]}`],
      queryFn: async () => await fetchTracks(),
    });

  if (isLoading) return <Loading />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <TrackList
      type="playlist"
      id={id[0]}
      tracks={data ? data.tracks_data : []}
      image={data ? data.image : ""}
      title={data ? data.name : ""}
    />
  );
}

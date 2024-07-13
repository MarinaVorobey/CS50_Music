import axios from "axios";
import { IArtistData, ITrack } from "./definitions";

export async function fetchTracks(userToken?: string): Promise<ITrack[]> {
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  const response = await axios
    .get("http://127.0.0.1:8000/tracks", { headers })
    .then((r) => r.data)
    .catch((err) => console.error(err));

  return response;
}

export async function fetchArtist({
  id,
  userToken,
}: {
  id: string;
  userToken?: string;
}): Promise<IArtistData[]> {
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  const response = await axios
    .get(`http://127.0.0.1:8000/artist/${id}`, { headers })
    .then((r) => r.data)
    .catch((err) => console.error(err));

  return response;
}

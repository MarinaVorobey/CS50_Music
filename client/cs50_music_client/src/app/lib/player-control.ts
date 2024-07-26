import { QueryClient } from "@tanstack/react-query";
import {
  IArtistData,
  IPlayerData,
  IPlaylistSingle,
  ITrack,
  TTrackQueues,
} from "./definitions";
import { FieldValues } from "react-hook-form";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export async function getPlayerData(): Promise<IPlayerData | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const data = window.localStorage.getItem("player_data");
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

export async function skipBack(
  playerData?: IPlayerData | null
): Promise<boolean> {
  if (!playerData || !playerData.previous.length) {
    throw new Error();
  }

  const curr = playerData.curr_track;
  playerData.next.unshift(+curr);
  const newCurr = playerData.previous.pop();
  playerData.curr_track = `${newCurr}`;
  window.localStorage.setItem("player_data", JSON.stringify(playerData));
  return true;
}

export async function skipNext(
  playerData?: IPlayerData | null
): Promise<boolean> {
  if (!playerData || !playerData.next.length) {
    throw new Error();
  }

  const curr = playerData.curr_track;
  playerData.previous.push(+curr);
  const newCurr = playerData.next.shift();
  playerData.curr_track = `${newCurr}`;
  window.localStorage.setItem("player_data", JSON.stringify(playerData));
  return true;
}

export async function toggleRepeat(
  data?: IPlayerData | null
): Promise<boolean> {
  if (!data) {
    throw new Error();
  }

  data.on_repeat = !data.on_repeat;
  window.localStorage.setItem("player_data", JSON.stringify(data));
  return true;
}

export async function shuffle(): Promise<boolean> {
  const data = await getPlayerData();
  if (!data) {
    throw new Error();
  }

  const next = data.next;
  const shuffled: number[] = [];
  while (next.length !== 0) {
    const id = next.splice(getRandomInt(next.length), 1)[0];
    shuffled.push(id);
  }
  data.next = shuffled;

  window.localStorage.setItem("player_data", JSON.stringify(data));
  return true;
}

export async function changeTrack(
  id: string,
  type: TTrackQueues,
  queryClient: QueryClient,
  queueId: string | null
): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  const key =
    type === "all"
      ? ["tracks"]
      : type !== "favorite"
      ? [type, queueId]
      : [type];
  const data: IPlaylistSingle | IArtistData | ITrack[] | undefined =
    queryClient.getQueryData(key);

  const prev = [];
  const next = [];
  if (data) {
    let tracks: ITrack[] = [];
    if ("cover" in data) {
      tracks = data.tracks_data;
    } else if ("tracks" in data) {
      tracks = data.tracks;
    } else {
      tracks = data;
    }

    const index = tracks.findIndex((t) => `${t.id}` === id);
    for (let i = 0; i < tracks.length; i++) {
      if (i < index) {
        prev.push(tracks[i].id);
      } else if (i > index) {
        next.push(tracks[i].id);
      }
    }
  }

  const newPlayerData: IPlayerData = {
    curr_track: id,
    queue_type: type,
    previous: prev,
    next: next,
    on_repeat: false,
  };

  if (type === "playlist" && data && "id" in data) {
    newPlayerData.playlist = `${data.id}`;
  }

  window.localStorage.setItem("player_data", JSON.stringify(newPlayerData));
  return true;
}

export async function checkAddedQueueIntegrity(
  queue: TTrackQueues,
  queryClient: QueryClient,
  trackId: string,
  playlists?: FieldValues
): Promise<void> {
  const data = await getPlayerData();
  if (!data) return;

  const currQueue = data.queue_type;
  if (currQueue !== queue) return;

  if (queue === "playlist" && playlists && data.playlist) {
    const playlistsFormatted: string[] = [];
    for (const p in playlists) {
      if (playlists[p]) playlistsFormatted.push(p);
    }
    const changed = playlistsFormatted.includes(data.playlist);
    if (!changed) return;
  }

  data.next.push(+trackId);
  window.localStorage.setItem("player_data", JSON.stringify(data));
  queryClient.invalidateQueries({ queryKey: ["player_data"] });
}

export async function checkRemovedQueueIntegrity(
  queue: TTrackQueues,
  queryClient: QueryClient,
  trackId: string,
  playlist?: string
): Promise<void> {
  const data = await getPlayerData();
  if (!data) return;

  const currQueue = data.queue_type;
  if (currQueue !== queue) return;
  if (queue === "playlist" && playlist && data.playlist !== playlist) return;

  if (data.curr_track === trackId) {
    if (!data.next.length && !data.previous.length) {
      window.localStorage.removeItem("player_data");
    } else {
      data.curr_track = data.next.length
        ? `${data.next.shift()}`
        : `${data.previous.pop()}`;
      window.localStorage.setItem("player_data", JSON.stringify(data));
    }
    queryClient.invalidateQueries({ queryKey: ["curr_track"] });
  } else {
    const prev = data.previous.findIndex((t) => t === +trackId);
    if (prev !== -1) {
      data.previous.splice(prev, 1);
    } else {
      const next = data.next.findIndex((t) => t === +trackId);
      data.next.splice(next, 1);
    }
    window.localStorage.setItem("player_data", JSON.stringify(data));
  }

  queryClient.invalidateQueries({ queryKey: ["player_data"] });
}

export async function onTrackEnd() {
  const data = await getPlayerData();
  if (!data) {
    throw new Error();
  }

  if (!data.on_repeat) {
    skipNext(data);
  }
}

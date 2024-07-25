import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IArtistData,
  ILoginResponse,
  IPlayerData,
  IPlaylistMany,
  IPlaylistSingle,
  ITrack,
  IUserData,
} from "./definitions";
import { FieldValues } from "react-hook-form";

export async function getUserToken(): Promise<string | null> {
  if (typeof window === "undefined" || !window.localStorage.getItem("user")) {
    return null;
  }

  const user = window.localStorage.getItem("user");
  if (!user) {
    return null;
  }
  const userData: IUserData = JSON.parse(user);
  const expires = new Date(userData.tokenExpires);

  if (expires.getTime() < Date.now()) {
    try {
      const response: AxiosResponse<ILoginResponse> = await axios.post(
        "http://127.0.0.1:8000/login/refresh",
        {
          refresh: userData.refreshToken,
        }
      );
      userData.accessToken = response.data.access;
      userData.refreshToken = response.data.refresh;
      userData.tokenExpires = new Date(
        Date.now() + 60 * 60 * 1000 * 2
      ).toString();
      window.localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        window.localStorage.removeItem("user");
      }
    }
  }
  return userData.accessToken ?? null;
}

async function makeHeaders(): Promise<{
  accept: string;
  Authorization?: string;
}> {
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  const userToken = await getUserToken();
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  return headers;
}

export async function fetchTracks(query?: string | null): Promise<ITrack[]> {
  const headers = await makeHeaders();
  const url = new URL("http://127.0.0.1:8000/tracks");
  if (query) url.searchParams.set("query", query);

  const response = await axios
    .get(url.toString(), { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchArtist(id: string): Promise<IArtistData[]> {
  const headers = await makeHeaders();
  const response = await axios
    .get(`http://127.0.0.1:8000/artist/${id}`, { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchFavorites(): Promise<ITrack[]> {
  const headers = await makeHeaders();
  const response = await axios
    .get("http://127.0.0.1:8000/favorites", { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function login(data: FieldValues): Promise<ILoginResponse> {
  const formattedData = {
    username: data.loginUsername,
    password: data.loginPassword,
  };

  const response = axios
    .post("http://127.0.0.1:8000/login", formattedData)
    .then((response) => {
      const data: ILoginResponse = response.data;
      const userData: IUserData = {
        username: formattedData.username,
        accessToken: data.access,
        refreshToken: data.refresh,
        tokenExpires: new Date(Date.now() + 60 * 60 * 1000 * 2).toString(),
      };
      window.localStorage.setItem("user", JSON.stringify(userData));
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });

  return response;
}

export async function registerUser(data: FieldValues): Promise<AxiosResponse> {
  const formattedData = {
    username: data.registerUsername,
    password: data.registerPassword,
    password2: data.registerRepeat,
  };

  const response = axios
    .post("http://127.0.0.1:8000/register", formattedData)
    .then((response) => response)
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });

  return response;
}

export async function logout() {
  if (typeof window === "undefined" || !window.localStorage.getItem("user")) {
    return null;
  }

  const user = window.localStorage.getItem("user");
  if (!user) {
    return null;
  }
  const userData: IUserData = JSON.parse(user);

  const response = await axios
    .post("http://127.0.0.1:8000/logout", {
      refresh: userData.refreshToken,
    })
    .then((response) => {
      window.localStorage.removeItem("user");
      return response;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });
  return response;
}

export async function likeTrack(id: string): Promise<AxiosResponse> {
  const headers = await makeHeaders();
  const response = await axios
    .patch(`http://127.0.0.1:8000/track/${id}/like`, {}, { headers })
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchPlaylists(): Promise<IPlaylistMany> {
  const headers = await makeHeaders();
  const response = await axios
    .get("http://127.0.0.1:8000/playlists", { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchPlaylist(id: string): Promise<IPlaylistSingle> {
  const headers = await makeHeaders();
  const response = await axios
    .get(`http://127.0.0.1:8000/playlist/${id}`, { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function createPlaylist(
  data: FieldValues
): Promise<IPlaylistSingle> {
  const formattedData = {
    name: data.playlistName,
    cover: data.coverNumber,
  };

  const headers = await makeHeaders();
  const response = axios
    .post("http://127.0.0.1:8000/playlists/create", formattedData, { headers })
    .then((r) => r.data)
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });

  return response;
}

export async function deletePlaylist(id: string): Promise<AxiosResponse> {
  const headers = await makeHeaders();
  const response = await axios
    .delete(`http://127.0.0.1:8000/playlist/${id}`, { headers })
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchPlaylistsForAdding(
  id: string
): Promise<IPlaylistMany> {
  const headers = await makeHeaders();
  const response = await axios
    .get(`http://127.0.0.1:8000/playlists/add/${id}`, { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function addToPlaylist(
  id: string,
  data: FieldValues
): Promise<AxiosResponse> {
  const headers = await makeHeaders();
  const playlistIds: string[] = [];
  for (const i in data) {
    if (data[i]) {
      playlistIds.push(i);
    }
  }
  const formattedData = {
    playlist_ids: playlistIds,
  };

  const response = await axios
    .patch(`http://127.0.0.1:8000/playlists/add/${id}`, formattedData, {
      headers,
    })
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function removeFromPlaylist(
  playlistId: string,
  trackId: string
): Promise<AxiosResponse> {
  const headers = await makeHeaders();

  const response = await axios
    .patch(
      `http://127.0.0.1:8000/playlist/${playlistId}`,
      {
        track_id: trackId,
      },
      {
        headers,
      }
    )
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchCurrentTrack(): Promise<ITrack | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const data = window.localStorage.getItem("player_data");
  if (!data) {
    return null;
  }

  const headers = await makeHeaders();
  const playerData: IPlayerData = JSON.parse(data);
  return axios
    .get(`http://127.0.0.1:8000/track/${playerData.curr_track}`, { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });
}

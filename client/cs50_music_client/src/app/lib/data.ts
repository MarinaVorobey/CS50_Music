import axios, { AxiosError, AxiosResponse } from "axios";
import { IArtistData, ILoginResponse, ITrack, IUserData } from "./definitions";
import { FieldValues } from "react-hook-form";

export async function getUserToken(): Promise<string | null> {
  if (typeof window === "undefined" || !window.localStorage.getItem("user")) {
    return null;
  }
  console.log("works");

  const user = window.localStorage.getItem("user");
  if (!user) {
    return null;
  }
  let userData: IUserData = JSON.parse(user);
  const expires = new Date(userData.tokenExpires);

  if (expires.getTime() < Date.now()) {
    try {
      await axios.post("http://127.0.0.1:8000/login/refresh", {
        refresh: userData.refreshToken,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        window.localStorage.removeItem("user");
      }
    }
  }
  return userData.accessToken ?? null;
}

export async function fetchTracks(): Promise<ITrack[]> {
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  const userToken = await getUserToken();
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

  const response = await axios
    .get("http://127.0.0.1:8000/tracks", { headers })
    .then((r) => r.data)
    .catch((err: AxiosError) => {
      console.error(err);
      throw err;
    });

  return response;
}

export async function fetchArtist({
  id,
}: {
  id: string;
  userToken?: string;
}): Promise<IArtistData[]> {
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  const userToken = await getUserToken();
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

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
  const headers: { accept: string; Authorization?: string } = {
    accept: "application/json",
  };

  const userToken = await getUserToken();
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }

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
        lastListened: 1,
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
  console.log("works");

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

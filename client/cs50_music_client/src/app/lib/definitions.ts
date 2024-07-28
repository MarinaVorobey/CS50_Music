export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  password: string;
  password2: string;
}

export interface IUserData {
  username: string;
  accessToken: string;
  refreshToken: string;
  tokenExpires: string;
}

export interface IArtist {
  id: number;
  name: string;
  image: string;
}

export interface ITrack {
  id: number;
  name: string;
  path: string;
  duration: string;
  created_at: string;
  album?: string;
  artist: IArtist;
  liked: boolean;
}

export interface IArtistData extends IArtist {
  tracks: ITrack[];
}

export interface IPlaylistMany {
  id: number;
  name: string;
  cover: number;
  track_count: number;
}

export interface IPlaylistSingle {
  id: number;
  name: string;
  cover: string;
  tracks_data: ITrack[];
}

export interface ILoginResponse {
  access: string;
  refresh: string;
}

export type TTracklists = "all" | "favorite" | "playlist" | "artist" | "search";

export type TTrackQueues = "all" | "favorite" | "playlist" | "artist";

export interface IPlayerData {
  curr_track: string;
  previous: number[];
  next: number[];
  queue_type: TTrackQueues;
  on_repeat: boolean;
  playlist?: string;
}

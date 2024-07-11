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
  lastListened: number;
  accessToken: string;
  refreshToken: string;
}

export interface IArtist {
  id: number;
  name: string;
  image: string;
}

export interface ITrack {
  id: number;
  name: string;
  duration: number;
  createdAt: Date;
  album?: string;
  artist: IArtist;
  liked: boolean;
}

export interface IPlaylistMany {
  id: number;
  name: string;
  coverNumber: number;
  track_count: number;
}

export interface IPlaylistSingle {
  id: number;
  name: string;
  tracks_data: ITrack;
}

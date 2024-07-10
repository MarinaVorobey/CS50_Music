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
  album?: string;
  artist: IArtist;
  liked: boolean;
}

export interface IPlaylist {
  id: number;
  name: string;
  coverNumber: number;
  tracks: number[];
}

export interface ITrack {
  id: number;
  name: string;
  path: string;
  image: string;
  duration: number;
  createdAt: Date;
  album?: string;
  artist: string;
  liked: boolean;
  playlists: number[];
}

export interface IPlaylist {
  id: number;
  name: string;
  createdAt: Date;
  tracks: ITrack[];
}

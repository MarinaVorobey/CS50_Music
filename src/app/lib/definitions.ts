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
  playlists: string[];
}

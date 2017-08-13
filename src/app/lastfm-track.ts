export interface LastfmTrack {
  id: string;
  name: string;
  url: string;
  artist: {
    name: string;
    url: string;
  };
  isPlaying: boolean;
  time: {
    relative: string;
    formatted: string
  };
}

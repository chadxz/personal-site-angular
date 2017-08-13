export interface PocketArticle {
  id: string;
  url: string;
  title: {
    display: string;
    formatted: string;
  };
  host: string;
  time: {
    relative: string;
    formatted: string;
  };
}

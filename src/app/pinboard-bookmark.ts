export interface PinboardBookmark {
  id: string;
  url: string;
  description: string;
  time: {
    relative: string;
    formatted: string;
  };
}

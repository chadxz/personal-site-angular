import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LastfmTrack } from './lastfm-track';
import {
  toDate,
  format as formatDate,
  formatDistanceToNow
} from 'date-fns';

@Injectable()
export class LastfmService {

  constructor(private http: HttpClient) { }

  static cleanTrack(track: any): LastfmTrack {
    const unixTimestampSansSeconds =
      track.date && track.date.uts ||
      (new Date()).getTime() / 1000;

    const trackDate = toDate(unixTimestampSansSeconds * 1000);

    return {
      id: String(trackDate),
      name: track.name,
      url: track.url,
      artist: {
        name: track.artist.name,
        url: track.artist.url,
      },
      isPlaying: track['@attr'] && (track['@attr'].nowplaying === 'true') || false,
      time: {
        relative: formatDistanceToNow(trackDate, { addSuffix: true }),
        formatted: formatDate(trackDate, environment.dateTimeFormat)
      }
    };
  }

  getTracks({ limit }: { limit: number }): Promise<LastfmTrack[]> {
    return this.http.get(`${environment.apiUrl}/lastfm?limit=${limit}`)
      .toPromise()
      .then((tracks: any[]) => tracks.map(LastfmService.cleanTrack));
  }
}

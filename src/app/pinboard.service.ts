import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { PinboardBookmark } from './pinboard-bookmark';
import {
  parseISO,
  format as formatDate,
  formatDistanceToNow
} from 'date-fns';

@Injectable()
export class PinboardService {

  constructor(private http: HttpClient) { }

  static cleanBookmark(bookmark: any): PinboardBookmark {
    const bookmarkDate = parseISO(bookmark.time);

    return {
      id: bookmark.hash,
      url: bookmark.href,
      description: bookmark.description,
      time: {
        relative: formatDistanceToNow(bookmarkDate, { addSuffix: true }),
        formatted: formatDate(bookmarkDate, environment.dateTimeFormat)
      }
    };
  }

  getBookmarks({ limit }: { limit: number }): Promise<PinboardBookmark[]> {
    return this.http.get(`${environment.apiUrl}/pinboard?limit=${limit}`)
      .toPromise()
      .then((bookmarks: any[]) => bookmarks.map(PinboardService.cleanBookmark));
  }
}

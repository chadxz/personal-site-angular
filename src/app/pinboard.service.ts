import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';
import { PinboardBookmark } from './pinboard-bookmark';
import {
  parse as parseDate,
  format as formatDate,
  distanceInWordsToNow
} from 'date-fns';

@Injectable()
export class PinboardService {

  constructor(private http: HttpClient) { }

  static cleanBookmark(bookmark: any): PinboardBookmark {
    const bookmarkDate = parseDate(bookmark.time);

    return {
      id: bookmark.hash,
      url: bookmark.href,
      description: bookmark.description,
      time: {
        relative: distanceInWordsToNow(bookmarkDate, { addSuffix: true }),
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

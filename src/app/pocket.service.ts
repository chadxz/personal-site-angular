import { Injectable } from '@angular/core';
import * as URL from 'url-parse';
import {HttpClient} from '@angular/common/http';
import {PocketArticle} from './pocket-article';
import {environment} from '../environments/environment';
import {
  toDate,
  format as formatDate,
  formatDistanceToNow
} from 'date-fns';

@Injectable()
export class PocketService {

  constructor(private http: HttpClient) { }

  static cleanArticle(article: any): PocketArticle {
    const articleDate = toDate(article.time_read * 1000);
    const displayedTitle = article.resolved_title || article.given_title || article.resolved_url;
    const formattedTitle = displayedTitle.length > 50 ? displayedTitle.slice(0, 47) + '...' : displayedTitle;
    const parsedUrl = new URL(article.resolved_url);

    return {
      id: article.item_id,
      url: article.resolved_url,
      title: {
        display: displayedTitle,
        formatted: formattedTitle
      },
      host: parsedUrl.host,
      time: {
        relative: formatDistanceToNow(articleDate, { addSuffix: true }),
        formatted: formatDate(articleDate, environment.dateTimeFormat)
      }
    };
  }

  getArticles({ limit }: { limit: number }): Promise<PocketArticle[]> {
    return this.http.get(`${environment.apiUrl}/pocket?limit=${limit}`)
      .toPromise()
      .then((articles: any[]) => articles.map(PocketService.cleanArticle));
  }
}

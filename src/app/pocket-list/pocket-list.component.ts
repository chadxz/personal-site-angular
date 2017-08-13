import { Component, OnInit } from '@angular/core';
import {PocketArticle} from '../pocket-article';
import {HttpClient} from '@angular/common/http';
import {PocketService} from '../pocket.service';

@Component({
  selector: 'app-pocket-list',
  providers: [PocketService],
  templateUrl: './pocket-list.component.html',
  styleUrls: ['./pocket-list.component.css']
})
export class PocketListComponent implements OnInit {

  articles: PocketArticle[];

  constructor(private pocketService: PocketService) { }

  ngOnInit() {
    this.pocketService.getArticles({ limit: 5 }).then(articles => {
      this.articles = articles;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {PinboardService} from '../pinboard.service';
import {PinboardBookmark} from '../pinboard-bookmark';

@Component({
  selector: 'app-pinboard-list',
  providers: [PinboardService],
  templateUrl: './pinboard-list.component.html',
  styleUrls: ['./pinboard-list.component.css']
})
export class PinboardListComponent implements OnInit {

  bookmarks: PinboardBookmark[];

  constructor(private pinboardService: PinboardService) { }

  ngOnInit() {
    this.pinboardService.getBookmarks({ limit: 5 }).then(bookmarks => {
      this.bookmarks = bookmarks;
    });
  }
}

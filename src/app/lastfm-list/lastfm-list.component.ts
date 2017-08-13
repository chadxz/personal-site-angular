import { Component, OnInit } from '@angular/core';
import {LastfmService} from '../lastfm.service';
import {LastfmTrack} from '../lastfm-track';

@Component({
  selector: 'app-lastfm-list',
  providers: [LastfmService],
  templateUrl: './lastfm-list.component.html',
  styleUrls: ['./lastfm-list.component.css']
})
export class LastfmListComponent implements OnInit {

  tracks: LastfmTrack[];

  constructor(private lastfmService: LastfmService) { }

  ngOnInit() {
    this.lastfmService.getTracks({ limit: 5 }).then(tracks => {
      this.tracks = tracks;
    });
  }
}

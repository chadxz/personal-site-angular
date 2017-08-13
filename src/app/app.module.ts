import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PinboardListComponent } from './pinboard-list/pinboard-list.component';
import { LastfmListComponent } from './lastfm-list/lastfm-list.component';
import { PocketListComponent } from './pocket-list/pocket-list.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PinboardListComponent,
    LastfmListComponent,
    PocketListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

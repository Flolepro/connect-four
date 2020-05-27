import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayerComponent } from './player/player.component';
import { TileComponent } from './tile/tile.component';

import { GameService } from './services/game.service';
import { ColorService } from './services/color.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ColorService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

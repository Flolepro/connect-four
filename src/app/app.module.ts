import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Modules
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule  } from "@angular/common/http";
//Components
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { PlayerComponent } from './components/player/player.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthComponent } from './components/auth/auth.component';
//Services
import { GameService } from './services/game.service';
import { ColorService } from './services/color.service';
import { ThemeService } from 'src/app/services/theme.service';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayerComponent,
    SidebarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    ColorService,
    GameService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

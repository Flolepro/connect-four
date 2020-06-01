import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient,HttpClientModule  } from "@angular/common/http";
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//Angular material
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
//Components
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//Services
import { GameService } from './services/game.service';
import { ColorService } from './services/color.service';
import { ThemeService } from './services/theme.service';

import { RoundState } from './shared/states/round.state';
import { RoundComponent } from './components/round/round.component';



@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SidebarComponent,
    RoundComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      RoundState
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [
    ColorService,
    GameService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

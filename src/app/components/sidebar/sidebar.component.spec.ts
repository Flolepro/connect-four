import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { GameService } from '../../../app/services/game.service';
import { ColorService } from '../../../app/services/color.service';
import { Store, NgxsModule } from '@ngxs/store';
import { RoundState } from '../../../app/shared/states/round.state';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { httpTranslateLoader } from '../../../app/app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ThemeService } from '../../../app/services/theme.service';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  //Imports for the component
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        HttpClientModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [ GameService, ColorService,Store,ThemeService ]
    })
    .compileComponents();
  }));

  //Initialize component before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Test the component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

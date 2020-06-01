import { Component, OnInit } from '@angular/core';

import { ThemeService } from '../app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private themeService : ThemeService,
    public translate: TranslateService
    ) {
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('en');
    }

  otherTheme = true;

  title = 'connect-four';

  ngOnInit(): void {
    this.themeService.menuActive.subscribe(value => this.otherTheme = value);
  }

}
